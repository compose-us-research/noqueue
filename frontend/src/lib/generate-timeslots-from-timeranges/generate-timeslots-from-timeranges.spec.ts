import generateTimeslotsFromTimeranges from "./generate-timeslots-from-timeranges";
import { Timerange, Timeslot } from "../../service/domain";

describe("generateTimeslotsFromTimeranges", () => {
  it("works with empty lists", () => {
    const result = generateTimeslotsFromTimeranges([]);
    expect(result).toEqual([]);
  });

  it("returns a single timeslot for a single day timerange", () => {
    const result = generateTimeslotsFromTimeranges([
      {
        amountOfPeopleInShop: 2,
        days: [false, true, false, false, false, false, false],
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 120,
      },
    ]);
    const expected: Timeslot = {
      start: "08:00",
      end: "12:00",
      day: 1,
      customers: 2,
      minDuration: 15,
      maxDuration: 120,
    };
    expect(result).toEqual([expected]);
  });

  it("extracts multiple timeslots out of a time range with multiple days", () => {
    const result = generateTimeslotsFromTimeranges([
      {
        amountOfPeopleInShop: 2,
        days: [false, true, true, false, false, false, true],
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 120,
      },
    ]);
    const expected: Timeslot[] = [
      {
        start: "08:00",
        end: "12:00",
        day: 1,
        customers: 2,
        minDuration: 15,
        maxDuration: 120,
      },
      {
        start: "08:00",
        end: "12:00",
        day: 2,
        customers: 2,
        minDuration: 15,
        maxDuration: 120,
      },
      {
        start: "08:00",
        end: "12:00",
        day: 6,
        customers: 2,
        minDuration: 15,
        maxDuration: 120,
      },
    ];
    expect(result).toEqual(expected);
  });

  it("works with multiple timeranges", () => {
    const result = generateTimeslotsFromTimeranges([
      {
        amountOfPeopleInShop: 2,
        days: [true, true, false, false, false, false, false],
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 120,
      },
      {
        amountOfPeopleInShop: 2,
        days: [false, true, false, false, false, false, false],
        start: "13:00",
        end: "18:00",
        minDuration: 15,
        maxDuration: 120,
      },
    ]);
    const expected1: Timeslot = {
      start: "08:00",
      end: "12:00",
      day: 0,
      customers: 2,
      minDuration: 15,
      maxDuration: 120,
    };
    const expected2: Timeslot = {
      start: "08:00",
      end: "12:00",
      day: 1,
      customers: 2,
      minDuration: 15,
      maxDuration: 120,
    };
    const expected3: Timeslot = {
      start: "13:00",
      end: "18:00",
      day: 1,
      customers: 2,
      minDuration: 15,
      maxDuration: 120,
    };
    expect(result).toContainEqual(expected1);
    expect(result).toContainEqual(expected2);
    expect(result).toContainEqual(expected3);
    expect(result.length).toBe(3);
  });
});
