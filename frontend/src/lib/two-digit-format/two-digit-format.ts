export default function twoDigitFormat(n: number): string {
  return (n < 0 ? "-" : "") + (Math.abs(n) < 10 ? "0" : "") + Math.abs(n);
}
