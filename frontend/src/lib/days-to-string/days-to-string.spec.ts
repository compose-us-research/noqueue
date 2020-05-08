import { Day } from "../../service/domain";
import daysToString, { AvailableDaysInWeek } from "./days-to-string";

describe("daysToString", () => {
  const fullWeekSet: AvailableDaysInWeek = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];

  it("converts an empty array to an empty string", () => {
    const empty: AvailableDaysInWeek = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    const result = daysToString(empty);
    expect(result).toBe("");
  });

  it("converts a single value to the same one as string", () => {
    const moSet: AvailableDaysInWeek = [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    const result = daysToString(moSet);
    expect(result).toBe("Mo");
  });

  it("converts all values to a comma separated list", () => {
    const result = daysToString(fullWeekSet);
    expect(result).toBe("Mo, Di, Mi, Do, Fr, Sa, So");
  });

  it("converts a list of week days into a comma separated list", () => {
    const moMiDoSo: AvailableDaysInWeek = [
      true,
      false,
      true,
      true,
      false,
      false,
      true,
    ];
    const result = daysToString(moMiDoSo);
    expect(result).toBe("Mo, Mi, Do, So");
  });
});
