import slotsPerDays from "./slots-per-days";
import dayStringFromTime from "../../service/day-string-from-time/day-string-from-time";

describe("slotsPerDays", () => {
  it("works with empty lists", () => {
    const result = slotsPerDays([]);
    expect(result).toEqual({});
  });

  it("keeps one day if all slots are on one day", () => {
    const start1 = new Date("2019-12-31T08:00:00.000Z");
    const start2 = new Date("2019-12-31T09:30:00.000Z");
    const start3 = new Date("2019-12-31T11:00:00.000Z");
    const end1 = new Date(+start1 + 15 * 60 * 1000);
    const end2 = new Date(+start2 + 15 * 60 * 1000);
    const end3 = new Date(+start3 + 15 * 60 * 1000);
    const slots = [
      { start: start1, end: end1 },
      { start: start2, end: end2 },
      { start: start3, end: end3 },
    ];
    const result = slotsPerDays(slots);
    const day = dayStringFromTime(start1);
    expect(result).toEqual({
      [day]: slots,
    });
  });

  it("can use multiple days if all slots are on one day", () => {
    const start1 = new Date("2019-12-31T08:00:00.000Z");
    const start2 = new Date("2020-01-13T09:30:00.000Z");
    const end1 = new Date(+start1 + 15 * 60 * 1000);
    const end2 = new Date(+start2 + 15 * 60 * 1000);
    const slots = [
      { start: start1, end: end1 },
      { start: start2, end: end2 },
    ];
    const [slot1, slot2] = slots;
    const result = slotsPerDays(slots);
    const day1 = dayStringFromTime(start1);
    const day2 = dayStringFromTime(start2);
    expect(result).toEqual({
      [day1]: [slot1],
      [day2]: [slot2],
    });
  });
});
