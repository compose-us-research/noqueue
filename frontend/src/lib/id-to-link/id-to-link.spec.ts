import idToLink from "./id-to-link";

describe("idToLink", () => {
  it("removes http from the id URL", () => {
    const result = idToLink("http://localhost:8080/shop/default");
    expect(result).toEqual("//localhost:8080/shop/default");
  });
  it("removes https protocol as well", () => {
    const result = idToLink("https://localhost:8080/shop/default");
    expect(result).toEqual("//localhost:8080/shop/default");
  });
  it("works on protocol-less ids", () => {
    const result = idToLink("//localhost:8080/shop/default");
    expect(result).toEqual("//localhost:8080/shop/default");
  });
  it("works with different urls", () => {
    const result = idToLink("http://beta.platzhalter.io/shop/happy-nails");
    expect(result).toEqual("//beta.platzhalter.io/shop/happy-nails");
  });
});
