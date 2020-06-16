import twoDigitFormat from "./two-digit-format";

describe("twoDigitFormat", () => {
  it("makes a 2 digit number out of a single digit number", () => {
    expect(twoDigitFormat(0)).toBe("00");
    expect(twoDigitFormat(1)).toBe("01");
    expect(twoDigitFormat(2)).toBe("02");
    expect(twoDigitFormat(3)).toBe("03");
    expect(twoDigitFormat(4)).toBe("04");
    expect(twoDigitFormat(5)).toBe("05");
    expect(twoDigitFormat(6)).toBe("06");
    expect(twoDigitFormat(7)).toBe("07");
    expect(twoDigitFormat(8)).toBe("08");
    expect(twoDigitFormat(9)).toBe("09");
  });

  it("keeps higher numbers in their format", () => {
    expect(twoDigitFormat(10)).toBe("10");
    expect(twoDigitFormat(36)).toBe("36");
    expect(twoDigitFormat(99)).toBe("99");
    expect(twoDigitFormat(123)).toBe("123");
    expect(twoDigitFormat(45539)).toBe("45539");
  });

  it("works with negative numbers", () => {
    expect(twoDigitFormat(-1)).toBe("-01");
    expect(twoDigitFormat(-9)).toBe("-09");
    expect(twoDigitFormat(-23)).toBe("-23");
    expect(twoDigitFormat(-99)).toBe("-99");
    expect(twoDigitFormat(-123)).toBe("-123");
    expect(twoDigitFormat(-45539)).toBe("-45539");
  });
});
