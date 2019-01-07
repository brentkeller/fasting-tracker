import * as date from './date';
import { LocalDateTime, ZoneOffset, ChronoUnit } from 'js-joda';

const startTime = '2018-11-01T08:00:00';
const endTime = '2018-11-01T09:10:00';

describe('calculateDuration', () => {
  test('should return zero when start is null', () => {
    const end = LocalDateTime.now(ZoneOffset.UTC);
    expect(date.calculateDuration(null, end)).toEqual(0);
  });

  test('should return zero when end is null', () => {
    const start = LocalDateTime.now(ZoneOffset.UTC);
    expect(date.calculateDuration(start, null)).toEqual(0);
  });

  test('should return the minutes between the dates', () => {
    const start = LocalDateTime.parse(startTime);
    const end = LocalDateTime.parse(endTime);
    expect(date.calculateDuration(start, end)).toEqual(70);
  });
});

describe('getDurationFromNow', () => {
  test('should return empty string when start is null', () => {
    expect(date.getDurationFromNow(null)).toEqual('');
  });

  test('should return the expected formatted duration string', () => {
    const now = LocalDateTime.now(ZoneOffset.UTC).minusMinutes(12);
    expect(date.getDurationFromNow(now)).toEqual('12m');
  });
});

describe('getDurationString', () => {
  test('should return empty string when duration is null', () => {
    expect(date.getDurationString(null)).toEqual('');
  });

  test('should return minutes only when duration is under 60 mins', () => {
    expect(date.getDurationString(59)).toEqual('59m');
  });

  test('should return hours and minutes when duration is over 59 mins', () => {
    expect(date.getDurationString(60)).toEqual('1h 0m');
  });

  test('should return whole hours and minutes when values are decimal', () => {
    expect(date.getDurationString(60.442)).toEqual('1h 0m');
  });
});

describe('getDisplayValue', () => {
  test('should return empty string when duration is null', () => {
    expect(date.getDisplayValue(null)).toEqual('');
  });

  test('should return string in desired format', () => {
    const start = LocalDateTime.parse(startTime);
    expect(date.getDisplayValue(start, 'ddd MMM DD YYYY HH:mm')).toEqual(
      'Thu Nov 01 2018 04:00',
    );
    expect(date.getDisplayValue(start, 'DD MMM YYYY h:mm a')).toEqual(
      '01 Nov 2018 4:00 am',
    );
  });
});

describe('getTimeFormat', () => {
  test('should return 12hr format when use24HrClock is false', () => {
    expect(date.getTimeFormat(false)).toEqual('h:mm a');
  });

  test('should return 24hr format when use24HrClock is true', () => {
    expect(date.getTimeFormat(true)).toEqual('HH:mm');
  });
});

describe('getDateTimeFormat', () => {
  test('should return date format with 12hr format when use24HrClock is false', () => {
    expect(date.getDateTimeFormat('YYYY.MM.DD', false)).toEqual(
      'YYYY.MM.DD h:mm a',
    );
  });

  test('should return date format with 24hr format when use24HrClock is true', () => {
    expect(date.getDateTimeFormat('YYYY.MM.DD', true)).toEqual(
      'YYYY.MM.DD HH:mm',
    );
  });
});
