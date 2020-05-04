import { Day } from "../../service/domain";

export default function daysToString(days: Set<Day>): string {
  const res = Array.from(days);
  return res.join(", ");
}
