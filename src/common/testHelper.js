import { LocalDateTime, ZoneOffset } from 'js-joda';
import { initialState } from './state/fasts/fasts';
import { initialState as settingsState } from './state/settings/settings';
import { calculateDuration } from 'common/date';

export const SAMPLE_START_STRING = '2018-11-01T20:00:00';
export const SAMPLE_START_EPOCH = 1541102400;
export const SAMPLE_END_STRING = '2018-11-02T12:00:00';
export const SAMPLE_END_EPOCH = 1541160000;

export function createFast(id, start, end) {
  const fast = {
    id: id
      ? id
      : LocalDateTime.now(ZoneOffset.UTC).toEpochSecond(ZoneOffset.UTC),
    start: !start ? null : LocalDateTime.parse(start),
    end: !end ? null : LocalDateTime.parse(end),
  };
  fast.duration = calculateDuration(fast.start, fast.end);
  return fast;
}

export const buildState = fasts => ({
  fasts,
  settings: { ...settingsState },
});

export function getPopulatedFasts(includeActiveFast = false) {
  const state = { ...initialState };
  const fast1 = createFast('abc', SAMPLE_START_STRING, SAMPLE_END_STRING);
  const fast2 = createFast('def', '2018-11-02T20:00:00', '2018-11-03T14:30:00');
  state.byId[fast1.id] = fast1;
  state.byId[fast2.id] = fast2;
  state.allIds = [fast1.id, fast2.id];
  if (includeActiveFast) {
    const active = createFast('ghi', '2018-11-03T20:00:00', null);
    state.byId[active.id] = active;
    state.allIds.push(active.id);
  }
  return state;
}

export function getEmptyState() {
  return buildState(initialState);
}

export function getSampleState(includeActiveFast = false) {
  const fasts = getPopulatedFasts(includeActiveFast);
  return buildState(fasts);
}
