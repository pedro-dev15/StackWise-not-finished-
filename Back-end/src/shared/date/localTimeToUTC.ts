import { fromZonedTime } from "date-fns-tz";
import { startOfDay } from "date-fns";

export function localDateToUtcStartOfDay(
  date: Date,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
): Date {
  const startOfLocalDay = startOfDay(date);

  return fromZonedTime(startOfLocalDay, timeZone);
}
