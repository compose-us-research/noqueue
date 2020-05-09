export default function calculateMaxDuration(from: string, to: string): number {
  const [fromH, fromMin] = checkTime(from);
  const [toH, toMin] = checkTime(to);
  return (toH - fromH) * 60 + (toMin - fromMin);
}

export function checkTime(time: string): [number, number] {
  const [h, min] = time.split(":").map(parseIntOrThrow);
  if (h < 0 || 24 <= h) {
    throw Error(
      "Fehlerhafte Zeitangabe - erwarte eine Stundenangabe zwischen 0 und 24."
    );
  }
  if (min < 0 || 60 <= min) {
    throw Error(
      "Fehlerhafte Zeitangabe - erwarte eine Minutenangabe zwischen 0 und 60."
    );
  }
  return [h, min];
}

function parseIntOrThrow(num: string): number {
  try {
    return parseInt(num, 10);
  } catch (e) {
    throw Error(
      "Fehlerhafte Zeitangabe - erwarte '<Stunde>:<Minute>', z.B. '08:15'"
    );
  }
}
