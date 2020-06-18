const server = require("../app")();
const supertest = require("supertest");
const request = supertest(server._server);

describe("server", () => {
  const products = [
    {
      id: 1,
      name: "test",
    },
  ];

  beforeAll(() => {
    server.get("/products", (req, res) => {
      res.json(products);
    });

    server.get("/protected", (req, res, next) => {
      if (req.headers["authorization"] === "abc123") {
        next();
      } else {
        res.statusCode = 401;
        res.send("Not allowed");
      }
    }, (req, res) => {
      res.send("protected route");
    });

    server.get("/orders/:id/items/:item", (req, res) => {
      res.json(req.params);
    });

    server.delete("/orders/:id", (req, res) => {
      res.json(req.params);
    });

    server.get("/orders", (req, res) => {
      res.json(req.query);
    });

    server.post("/products", (req,res) => {
      res.json(req.body);
    });

    server.put("/products", (req, res) => {
      res.json(req.body);
    });
  });

  afterAll(async (done) => {
    server._server.close(() => {
      console.log("server closed!");
      done();
    });
  }); 
  test("GET should return 1 product", async(done) => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(products);
    done();
  });

  test("POST should return the posted body", async(done) => {
    const res = await request
      .post("/products")
      .send({ name : "cucumber" });
    expect(res.body).toEqual({ name : "cucumber" });
    done();
  });

  test("PUT should return the posted body", async (done) => {
    const res = await request.put("/products").send({ name: "cucumber" });
    expect(res.body).toEqual({ name: "cucumber" });
    done();
  });

  test("GET should return query params", async (done) => {
    const res = await request.get("/orders?page=1&pageSize=200");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      page: "1",
      pageSize: "200"
    });
    done();
  });

  test("GET should return correct route params", async(done) => {
    const res = await request.get("/orders/1/items/2");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: "1",
      item: "2"
    });
    done();
  });

  test("DELETE should return correct route params", async (done) => {
    const res = await request.delete("/orders/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: "1"
    });
    done();
  });

  test("GET should return 401 on protected route if auth header is missing", async(done) => {
    const res = await request.get("/protected");
    expect(res.status).toBe(401);
    expect(res.text).toBe("Not allowed");
    done();
  });

  test("GET should return 200 on protected route if auth header is present", async (done) => {
    const res = await request
    .get("/protected")
    .set("authorization", "abc123");
    expect(res.status).toBe(200);
    expect(res.text).toBe("protected route");
    done();
  });

  test("GET no match", async(done) => {
    const res = await request.get("/nomatch");
    expect(res.status).toBe(404);
    expect(res.text).toBe("Not found");
    done();
  });
});