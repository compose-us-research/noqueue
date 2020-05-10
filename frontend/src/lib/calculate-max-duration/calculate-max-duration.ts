export default function calculateMaxDuration(from: string, to: string): number {
  const [fromH, fromMin] = checkTime(from);
  const [toH, toMin] = checkTime(to);
  const fromInMin = fromH * 60 + fromMin;
  const toInMin = toH * 60 + toMin;
  const fullDayInMinutes = 24 * 60;
  if (fromInMin === toInMin) {
    return fullDayInMinutes;
  }
  if (toInMin < fromInMin) {
    return fullDayInMinutes - fromInMin + toInMin;
  }
  return toInMin - fromInMin;
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
