const parse = require("../query-params");
describe("query params", () => {
  test("should parse query params", () => {
    expect(parse("/products?page=1&pageSize=100")).toEqual({
      page: "1",
      pageSize: "100"
    });
  });

  test("should parse query params, one param", () => {
    expect(parse("/products?page=1")).toEqual({
      page: "1"
    });
  });

  test("should parse query params, one param, string", () => {
    expect(parse("/products?page=abc")).toEqual({
      page: "abc",
    });
  });

  test("should not crash when there are no params", () => {
    expect(parse("/products/114")).toEqual({});
  });
});