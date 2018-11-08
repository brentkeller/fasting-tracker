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
  const mins = duration % 60;
  const hrs = (duration - mins) / 60;
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

export function getDisplayValue(date) {
  return dayjs
    .unix(date.toEpochSecond(ZoneOffset.UTC))
    .format('ddd MMM DD YYYY HH:mm');
}
