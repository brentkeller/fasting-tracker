import { LocalDateTime, ZoneOffset } from 'js-joda';
import { initialState } from './state/ducks/fasts';

export function createFast(id, start, end) {
  return {
    id: id
      ? id
      : LocalDateTime.now(ZoneOffset.UTC).toEpochSecond(ZoneOffset.UTC),
    start: !start ? null : LocalDateTime.parse(start),
    end: !end ? null : LocalDateTime.parse(end),
  };
}

export const buildState = fasts => ({
  fasts,
});

export function getPopulatedFasts() {
  const state = { ...initialState };
  const fast1 = createFast('abc', '2018-11-01T20:00:00', '2018-11-02T12:00:00');
  const fast2 = createFast('def', '2018-11-02T20:00:00', '2018-11-03T12:00:00');
  state.byId[fast1.id] = fast1;
  state.byId[fast2.id] = fast2;
  state.allIds = [fast1.id, fast2.id];
  return state;
}

export function getEmptyState() {
  return buildState(initialState);
}

export function getSampleState() {
  const fasts = getPopulatedFasts();
  return buildState(fasts);
}
