import { Day } from "../../service/domain";
import daysToString from "./days-to-string";

describe("daysToString", () => {
  const fullWeekSet = new Set<Day>();
  fullWeekSet.add("Mo");
  fullWeekSet.add("Di");
  fullWeekSet.add("Mi");
  fullWeekSet.add("Do");
  fullWeekSet.add("Fr");
  fullWeekSet.add("Sa");
  fullWeekSet.add("So");

  it("converts an empty set to an empty string", () => {
    const mySet = new Set<Day>();
    const result = daysToString(mySet);
    expect(result).toBe("");
  });

  it("converts a single value to the same one as string", () => {
    const moSet = new Set<Day>();
    moSet.add("Mo");
    const result = daysToString(moSet);
    expect(result).toBe("Mo");
  });

  it("converts all values to a comma separated list", () => {
    const result = daysToString(fullWeekSet);
    expect(result).toBe("Mo, Di, Mi, Do, Fr, Sa, So");
  });

  it("converts a list of week days into a comma separated list", () => {
    const moMiDoSo = new Set<Day>(["Mo", "Mi", "Do", "So"]);
    const result = daysToString(moMiDoSo);
    expect(result).toBe("Mo, Mi, Do, So");
  });

  it("converts a random list of week days into the expected comma separated list", () => {
    const doMoSoMi = new Set<Day>(["Do", "Mo", "So", "Mi"]);
    const result = daysToString(doMoSoMi);
    expect(result).toBe("Mo, Mi, Do, So");
  });
});
