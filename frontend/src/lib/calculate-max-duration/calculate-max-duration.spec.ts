import calculateMaxDuration from "./calculate-max-duration";

describe("calculateMaxDuration", () => {
  it("returns the correct amount of single digit minutes", () => {
    const result = calculateMaxDuration("08:00", "08:01");
    expect(result).toBe(1);
  });

  it("returns the correct amount of single digit hours", () => {
    const result = calculateMaxDuration("08:00", "09:00");
    expect(result).toBe(60);
  });

  it("returns the correct amount of multi digit minutes", () => {
    const result = calculateMaxDuration("08:00", "08:55");
    expect(result).toBe(55);
  });

  it("returns the correct amount of multi digit hours", () => {
    const result = calculateMaxDuration("08:00", "18:00");
    expect(result).toBe(600);
  });

  it("complains if minutes >= 60", () => {
    expect(() => calculateMaxDuration("08:00", "08:60")).toThrow(/fehler/i);
    expect(() => calculateMaxDuration("08:00", "08:65")).toThrow(/fehler/i);
    expect(() => calculateMaxDuration("08:00", "08:921")).toThrow(/fehler/i);
  });

  it("complains if hours >= 24", () => {
    expect(() => calculateMaxDuration("08:00", "24:00")).toThrow(/fehler/i);
    expect(() => calculateMaxDuration("08:00", "56:00")).toThrow(/fehler/i);
    expect(() => calculateMaxDuration("08:00", "561:00")).toThrow(/fehler/i);
  });

  it("complains for negative numbers", () => {
    expect(() => calculateMaxDuration("-04:00", "-01:00")).toThrow(/fehler/i);
    expect(() => calculateMaxDuration("04:-10", "04:-05")).toThrow(/fehler/i);
  })
});
