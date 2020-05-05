import { Day } from "../../service/domain";

const possibleDays: Day[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export default function daysToString(days: Set<Day>): string {
  const daysArray = Array.from(days);
  const sortedDays = daysArray.sort(
    (a, b) => possibleDays.indexOf(a) - possibleDays.indexOf(b)
  );
  return sortedDays.join(", ");
}
