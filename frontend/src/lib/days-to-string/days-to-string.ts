import { Day } from "../../service/domain";

const possibleDays: Day[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export default function daysToString(
  days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
): string {
  const result = days.reduce<Day[]>(
    (result, isSet, index) => [
      ...result,
      ...(isSet ? [possibleDays[index]] : []),
    ],
    []
  );
  return result.join(", ");
}
