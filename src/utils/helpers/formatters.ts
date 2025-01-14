export function convertDaysToMs(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

export function convertSecondsToMs(seconds: number): number {
  return seconds * 1000;
}
