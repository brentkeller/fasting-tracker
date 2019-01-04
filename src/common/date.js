import { LocalDateTime, ZoneOffset, ChronoUnit } from 'js-joda';
import dayjs from 'dayjs';

export function calculateDuration(start, end) {
  if (!start || !end) return 0;
  return start.until(end, ChronoUnit.MINUTES);
}

export function getDurationFromNow(start) {
  if (!start) return '';
  const now = LocalDateTime.now(ZoneOffset.UTC);
  const duration = calculateDuration(start, now);
  return getDurationString(duration);
}

export function getDurationString(duration) {
  if (!duration) return '';
  const mins = Math.floor(duration % 60);
  const hrs = Math.floor((duration - mins) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

export function getDisplayValue(date, format = 'ddd MMM DD YYYY HH:mm') {
  if (!date) return '';
  return dayjs.unix(date.toEpochSecond(ZoneOffset.UTC)).format(format);
}
