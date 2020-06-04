import { Timeslot, Timerange, DayOfWeek } from "../../service/domain";

export default function generateTimeslotsFromTimeranges(
  timeranges: Timerange[]
): Timeslot[] {
  return timeranges.reduce<Timeslot[]>(
    (slots, range) => [...slots, ...singleRangeToSlots(range)],
    []
  );
}

function singleRangeToSlots(range: Timerange): Timeslot[] {
  const [minDuration, maxDuration] = range.duration;
  const potentialSlot: Omit<Timeslot, "day"> = {
    customers: range.amountOfPeopleInShop,
    start: range.start,
    end: range.end,
    minDuration,
    maxDuration,
  };
  return range.days.reduce<Timeslot[]>((slots, isSet, index) => {
    const slotOrNot: Timeslot[] = isSet
      ? [{ ...potentialSlot, day: index as DayOfWeek }]
      : [];
    return [...slots, ...slotOrNot];
  }, []);
}
