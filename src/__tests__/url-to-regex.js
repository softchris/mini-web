const parse = require("../url-to-regex");

describe("testing url", () => {
  test("should become correct Regex", () => {
    expect(parse("/products")).toBe("/products");
  });

  test("should give match with param", () => {
    expect(parse("/products/:id")).toBe("/products/(?<id>\\w+)");
    const m = "/products/114".match(new RegExp("/products/(?<id>\\w+)"));

    expect(m.groups.id).toBe("114");
  });

  test("should give match with param v2", () => {
    expect(parse("/orders/:id/items/:item/")).toBe("/orders/(?<id>\\w+)/items/(?<item>\\w+)/");
  });

  test("regex", () => {
    expect(/\w/.test("a")).toBe(true);
    expect(new RegExp("/products").test("/products")).toBe(true);
    expect(/\products/.test("/products")).toBe(true);
  });
});