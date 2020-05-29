import generateTimerangesFromTimeslots from "./generate-timeranges-from-timeslots";
import { Timerange } from "../../service/domain";

describe("generateTimerangesFromTimeslots", () => {
  it("returns an empty list from an empty list", () => {
    const result = generateTimerangesFromTimeslots([]);
    expect(result).toEqual([]);
  });

  it("returns a timerange from a time slot", () => {
    const result = generateTimerangesFromTimeslots([
      {
        customers: 2,
        day: 1,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
    ]);
    const expected: Timerange = {
      amountOfPeopleInShop: 2,
      days: [false, true, false, false, false, false, false],
      start: "08:00",
      end: "12:00",
      duration: [15, 60],
    };
    expect(result).toEqual([expected]);
  });

  it("works with multiple time slots of the same sizes", () => {
    const result = generateTimerangesFromTimeslots([
      {
        customers: 2,
        day: 1,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
      {
        customers: 2,
        day: 2,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
      {
        customers: 2,
        day: 0,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
    ]);
    const expected: Timerange = {
      amountOfPeopleInShop: 2,
      days: [true, true, true, false, false, false, false],
      start: "08:00",
      end: "12:00",
      duration: [15, 60],
    };
    expect(result).toEqual([expected]);
  });

  it("generates multiple time ranges if necessary", () => {
    const result = generateTimerangesFromTimeslots([
      {
        customers: 2,
        day: 1,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
      {
        customers: 2,
        day: 1,
        start: "13:00",
        end: "18:00",
        minDuration: 15,
        maxDuration: 60,
      },
    ]);
    const expected1: Timerange = {
      amountOfPeopleInShop: 2,
      days: [false, true, false, false, false, false, false],
      start: "08:00",
      end: "12:00",
      duration: [15, 60],
    };
    const expected2: Timerange = {
      amountOfPeopleInShop: 2,
      days: [false, true, false, false, false, false, false],
      start: "13:00",
      end: "18:00",
      duration: [15, 60],
    };

    expect(result).toContainEqual(expected1);
    expect(result).toContainEqual(expected2);
    expect(result.length).toBe(2);
  });

  it("generates multiple time ranges if necessary and merges at the same time where possible", () => {
    const result = generateTimerangesFromTimeslots([
      {
        customers: 2,
        day: 1,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
      {
        customers: 4,
        day: 2,
        start: "13:00",
        end: "18:00",
        minDuration: 15,
        maxDuration: 120,
      },
      {
        customers: 4,
        day: 3,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
      {
        customers: 4,
        day: 0,
        start: "08:00",
        end: "12:00",
        minDuration: 15,
        maxDuration: 60,
      },
    ]);
    const expected1: Timerange = {
      amountOfPeopleInShop: 2,
      days: [false, true, false, false, false, false, false],
      start: "08:00",
      end: "12:00",
      duration: [15, 60],
    };
    const expected2: Timerange = {
      amountOfPeopleInShop: 4,
      days: [false, false, true, false, false, false, false],
      start: "13:00",
      end: "18:00",
      duration: [15, 120],
    };
    const expected3: Timerange = {
      amountOfPeopleInShop: 4,
      days: [true, false, false, true, false, false, false],
      start: "08:00",
      end: "12:00",
      duration: [15, 60],
    };

    expect(result).toContainEqual(expected1);
    expect(result).toContainEqual(expected2);
    expect(result).toContainEqual(expected3);
    expect(result.length).toBe(3);
  });

  it("works for over-night times", () => {
    const result = generateTimerangesFromTimeslots([
      {
        customers: 2,
        day: 1,
        start: "20:00",
        end: "02:00",
        minDuration: 15,
        maxDuration: 120,
      },
    ]);
    const expected: Timerange = {
      amountOfPeopleInShop: 2,
      days: [false, true, false, false, false, false, false],
      start: "20:00",
      end: "02:00",
      duration: [15, 120],
    };
    expect(result).toEqual([expected]);
  });
});
