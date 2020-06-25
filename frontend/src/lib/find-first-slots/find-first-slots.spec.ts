import findFirstSlots from "./find-first-slots";

describe("findFirstSlots", () => {
  it("returns null value when there is no slot", () => {
    const result = findFirstSlots([]);
    expect(result).toBeNull();
  });
});
