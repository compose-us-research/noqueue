import generateSlotsFromData from "./generate-slots-from-data";

describe("generateSlotsFromData", () => {
  describe("using days", () => {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    it("returns empty list for empty list", () => {
      const result = generateSlotsFromData({
        slots: [],
        duration: 15,
        from: new Date(),
        usesDays: true,
      });
      expect(result).toEqual([]);
    });

    it("returns one slot if duration is same", () => {
      const now = Date.now();
      const start = new Date(now);
      const end = new Date(now + oneDayInMs);
      const result = generateSlotsFromData({
        slots: [
          {
            allowed: 1,
            available: 1,
            end,
            start,
            reserved: 0,
          },
        ],
        duration: 1,
        from: new Date(now),
        usesDays: true,
      });
      expect(result).toEqual([{ start, end }]);
    });

    it("returns multiple slots in days", () => {
      const now = Date.now();
      const start1 = new Date(now);
      const end1 = new Date(now + oneDayInMs);
      const start2 = new Date(now + oneDayInMs);
      const end2 = new Date(+start2 + oneDayInMs);
      const result = generateSlotsFromData({
        slots: [
          {
            allowed: 1,
            available: 1,
            end: end2,
            start: start1,
            reserved: 0,
          },
        ],
        duration: 1,
        from: new Date(now),
        usesDays: true,
      });
      expect(result).toEqual([
        { start: start1, end: end1 },
        { start: start2, end: end2 },
      ]);
    });
  });

  describe("not using days", () => {
    it("returns empty list for empty list", () => {
      const result = generateSlotsFromData({
        slots: [],
        duration: 15,
        from: new Date(),
        usesDays: false,
      });
      expect(result).toEqual([]);
    });

    it("returns one slot if duration is same", () => {
      const now = Date.now();
      const start = new Date(now);
      const end = new Date(now + 15 * 60 * 1000);
      const result = generateSlotsFromData({
        slots: [
          {
            allowed: 1,
            available: 1,
            end,
            start,
            reserved: 0,
          },
        ],
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
      expect(result).toEqual([{ start, end }]);
    });

    it("returns no slot if times are not available", () => {
      const now = Date.now();
      const start = new Date(now);
      const end = new Date(now + 15 * 60 * 1000);
      const result = generateSlotsFromData({
        slots: [
          {
            allowed: 1,
            available: 0,
            end,
            start,
            reserved: 1,
          },
        ],
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
      expect(result).toEqual([]);
    });

    it("returns multiple slots in 15 minute ranges if there is enough time", () => {
      const now = Date.now();
      const start = new Date(now);
      const end = new Date(now + 50 * 60 * 1000);
      const result = generateSlotsFromData({
        slots: [
          {
            allowed: 1,
            available: 1,
            end,
            start,
            reserved: 0,
          },
        ],
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
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
      const result = generateSlotsFromData({
        slots: [
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
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
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
      const result = generateSlotsFromData({
        slots: [
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
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
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
      const result = generateSlotsFromData({
        slots: [
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
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
      expect(result).toEqual([]);
    });

    it("filters slots that are in the past", () => {
      const now = Date.now();
      const start = new Date(now - 30 * 60 * 1000);
      const end = new Date(now + 30 * 60 * 1000);
      const result = generateSlotsFromData({
        slots: [
          {
            allowed: 2,
            available: 1,
            end,
            start,
            reserved: 1,
          },
        ],
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
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

    it("returns nice times when slots in the past were filtered", () => {
      const now = Date.now();
      const start = new Date(now - 10 * 60 * 1000);
      const end = new Date(now + 35 * 60 * 1000);
      const result = generateSlotsFromData({
        slots: [
          {
            allowed: 2,
            available: 1,
            end,
            start,
            reserved: 1,
          },
        ],
        duration: 15,
        from: new Date(now),
        usesDays: false,
      });
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

    it("creates something for all 15 minutes", () => {
      const start = new Date("2020-06-07T18:25:00.000Z");
      const secondDayStart = new Date("2020-06-08T16:30:00.000Z");
      const thirdDayStart = new Date("2020-06-09T16:30:00.000Z");
      const slots = [
        {
          start: new Date("2020-06-07T16:30:00.000Z"),
          end: new Date("2020-06-07T18:00:00.000Z"),
          reserved: 1,
          allowed: 3,
          available: 2,
        },
        {
          start: secondDayStart,
          end: new Date("2020-06-08T18:00:00.000Z"),
          reserved: 0,
          allowed: 3,
          available: 3,
        },
        {
          start: thirdDayStart,
          end: new Date("2020-06-09T18:00:00.000Z"),
          reserved: 0,
          allowed: 3,
          available: 3,
        },
      ];
      const result = generateSlotsFromData({
        slots,
        duration: 30,
        from: start,
        usesDays: false,
      });
      const daySlots = (startOfSlots: Date) => [
        {
          start: startOfSlots,
          end: new Date(+startOfSlots + 30 * 60 * 1000),
        },
        {
          start: new Date(+startOfSlots + 15 * 60 * 1000),
          end: new Date(+startOfSlots + (15 + 30) * 60 * 1000),
        },
        {
          start: new Date(+startOfSlots + 30 * 60 * 1000),
          end: new Date(+startOfSlots + (30 + 30) * 60 * 1000),
        },
        {
          start: new Date(+startOfSlots + 45 * 60 * 1000),
          end: new Date(+startOfSlots + (45 + 30) * 60 * 1000),
        },
        {
          start: new Date(+startOfSlots + 60 * 60 * 1000),
          end: new Date(+startOfSlots + (60 + 30) * 60 * 1000),
        },
      ];
      expect(result).toEqual([
        ...daySlots(secondDayStart),
        ...daySlots(thirdDayStart),
      ]);
    });
  });
});
