import { AvailableSlot } from "../../service/domain";
import dayStringFromTime from "../../service/day-string-from-time/day-string-from-time";

type SlotsPerDay = { [day: string]: AvailableSlot[] };

export default function slotsPerDays(slots: AvailableSlot[]): SlotsPerDay {
  return slots.reduce<SlotsPerDay>((acc, slot) => {
    const day = dayStringFromTime(slot.start);
    return {
      ...acc,
      [day]: [...(acc[day] || []), slot],
    };
  }, {});
}
