import { Day } from "../../service/domain";

const possibleDays: Day[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export type AvailableDaysInWeek = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

export default function daysToString(days: AvailableDaysInWeek): string {
  const result = days.reduce<Day[]>(
    (result, isSet, index) => [
      ...result,
      ...(isSet ? [possibleDays[index]] : []),
    ],
    []
  );
  return result.join(", ");
}
