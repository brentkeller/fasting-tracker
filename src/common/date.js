import { LocalDateTime, ZoneOffset, ChronoUnit } from 'js-joda';
import dayjs from 'dayjs';

export const dateFormats = [
  'ddd MMM DD, YYYY',
  'D MMM YYYY',
  'MM/DD/YYYY',
  'DD/MM/YYYY',
];

export function calculateDuration(start, end) {
  if (!start || !end) return 0;
  return start.until(end, ChronoUnit.MINUTES);
}

export const getNow = () => LocalDateTime.now(ZoneOffset.UTC);

export function getDurationFromNow(start) {
  if (!start) return '';
  const now = getNow();
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

export function getDisplayValue(date, format) {
  if (!date) return '';
  return dayjs.unix(date.toEpochSecond(ZoneOffset.UTC)).format(format);
}

export const getTimeFormat = use24HrClock =>
  use24HrClock ? 'HH:mm' : 'h:mm a';

export const getDateTimeFormat = (dateFormat, use24HrClock) =>
  `${dateFormat} ${getTimeFormat(use24HrClock)}`;
