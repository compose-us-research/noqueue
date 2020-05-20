import { Timerange, Timeslot } from "../../service/domain";
import calculateMaxDuration from "../calculate-max-duration/calculate-max-duration";

export default function generateTimerangesFromTimeslots(
  timeslots: Timeslot[]
): Timerange[] {
  const hashedTimeslots = timeslots.reduce<{ [hash: string]: Timeslot[] }>(
    (hashed, timeslot) => {
      const hash = `${timeslot.start}-${timeslot.end}-${timeslot.customers}`;
      return { ...hashed, [hash]: [...(hashed[hash] || []), timeslot] };
    },
    {}
  );

  return Object.keys(hashedTimeslots).map((hash) => {
    const timerange = timeslotToTimerangeWithoutDays(hashedTimeslots[hash][0]);
    hashedTimeslots[hash].forEach((slot) => {
      timerange.days[slot.day] = true;
    });
    return timerange;
  });
}

function timeslotToTimerangeWithoutDays(timeslot: Timeslot): Timerange {
  const range: Timerange = {
    amountOfPeopleInShop: timeslot.customers,
    days: [false, false, false, false, false, false, false],
    start: timeslot.start,
    end: timeslot.end,
    minDuration: 0,
    maxDuration: calculateMaxDuration(timeslot.start, timeslot.end),
  };
  return range;
}
