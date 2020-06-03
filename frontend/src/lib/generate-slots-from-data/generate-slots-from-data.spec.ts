import generateSlotsFromData from "./generate-slots-from-data";

describe("generateSlotsFromData", () => {
  it("returns empty list for empty list", () => {
    const result = generateSlotsFromData([], 15, new Date());
    expect(result).toEqual([]);
  });

  it("returns one slot if duration is same", () => {
    const now = Date.now();
    const start = new Date(now);
    const end = new Date(now + 15 * 60 * 1000);
    const result = generateSlotsFromData(
      [
        {
          allowed: 1,
          available: 1,
          end,
          start,
          reserved: 0,
        },
      ],
      15,
      new Date(now)
    );
    expect(result).toEqual([{ start, end }]);
  });

  it("returns no slot if times are not available", () => {
    const now = Date.now();
    const start = new Date(now);
    const end = new Date(now + 15 * 60 * 1000);
    const result = generateSlotsFromData(
      [
        {
          allowed: 1,
          available: 0,
          end,
          start,
          reserved: 1,
        },
      ],
      15,
      new Date(now)
    );
    expect(result).toEqual([]);
  });

  it("returns multiple slots in 15 minute ranges if there is enough time", () => {
    const now = Date.now();
    const start = new Date(now);
    const end = new Date(now + 50 * 60 * 1000);
    const result = generateSlotsFromData(
      [
        {
          allowed: 1,
          available: 1,
          end,
          start,
          reserved: 0,
        },
      ],
      15,
      new Date(now)
    );
    expect(result).toEqual([
      {
        start,
        end: new Date(+start + 15 * 60 * 1000),
      },
      {
        start: new Date(+start + 15 * 60 * 1000),
        end: new Date(+start + 30 * 60 * 1000),
      },
      {
        start: new Date(+start + 30 * 60 * 1000),
        end: new Date(+start + 45 * 60 * 1000),
      },
    ]);
  });

  it("returns slots for all available ranges", () => {
    const now = Date.now();
    const start1 = new Date(now);
    const end1 = new Date(+start1 + 30 * 60 * 1000);
    const start2 = new Date(now + 60 * 60 * 1000); // one hour later another spot
    const end2 = new Date(+start2 + 25 * 60 * 1000);
    const result = generateSlotsFromData(
      [
        {
          allowed: 1,
          available: 1,
          end: end1,
          start: start1,
          reserved: 0,
        },
        {
          allowed: 1,
          available: 1,
          end: end2,
          start: start2,
          reserved: 0,
        },
      ],
      15,
      new Date(now)
    );
    expect(result).toEqual([
      { start: start1, end: new Date(+start1 + 15 * 60 * 1000) },
      {
        start: new Date(+start1 + 15 * 60 * 1000),
        end: new Date(+start1 + 30 * 60 * 1000),
      },
      {
        start: start2,
        end: new Date(+start2 + 15 * 60 * 1000),
      },
    ]);
  });

  it("merges slots with enough availability to get a big enough ranges", () => {
    const now = Date.now();
    const start1 = new Date(now);
    const end1 = new Date(now + 10 * 60 * 1000);
    const start2 = new Date(now + 10 * 60 * 1000);
    const end2 = new Date(now + 20 * 60 * 1000);
    const result = generateSlotsFromData(
      [
        {
          allowed: 2,
          available: 1,
          end: end1,
          start: start1,
          reserved: 1,
        },
        {
          allowed: 2,
          available: 2,
          end: end2,
          start: start2,
          reserved: 0,
        },
      ],
      15,
      new Date(now)
    );
    expect(result).toEqual([
      {
        start: start1,
        end: new Date(+start1 + 15 * 60 * 1000),
      },
    ]);
  });

  it("does not merge slots without enough availability", () => {
    const now = Date.now();
    const start1 = new Date(now);
    const end1 = new Date(now + 10 * 60 * 1000);
    const start2 = new Date(now + 10 * 60 * 1000);
    const end2 = new Date(now + 20 * 60 * 1000);
    const result = generateSlotsFromData(
      [
        {
          allowed: 2,
          available: 1,
          end: end1,
          start: start1,
          reserved: 1,
        },
        {
          allowed: 2,
          available: 0,
          end: end2,
          start: start2,
          reserved: 2,
        },
      ],
      15,
      new Date(now)
    );
    expect(result).toEqual([]);
  });

  it("filters slots that are in the past", () => {
    const now = Date.now();
    const start = new Date(now - 30 * 60 * 1000);
    const end = new Date(now + 30 * 60 * 1000);
    const result = generateSlotsFromData(
      [
        {
          allowed: 2,
          available: 1,
          end,
          start,
          reserved: 1,
        },
      ],
      15,
      new Date(now)
    );
    expect(result).toEqual([
      {
        start: new Date(now),
        end: new Date(+now + 15 * 60 * 1000),
      },
      {
        start: new Date(+now + 15 * 60 * 1000),
        end: new Date(+now + 30 * 60 * 1000),
      },
    ]);
  });
});
