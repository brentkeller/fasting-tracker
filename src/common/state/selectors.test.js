import * as selectors from './selectors';
import * as helper from 'common/testHelper';
import { initialState as settingsInitialState } from 'common/state/settings/settings';

describe('getFasts', () => {
  test('returns empty array when there are no entries', () => {
    const state = helper.getEmptyState();
    expect(selectors.getFasts(state)).toHaveLength(0);
  });

  test('returns array of fasts', () => {
    const state = helper.getSampleState();
    expect(selectors.getFasts(state)).toHaveLength(2);
  });
});

describe('getFast', () => {
  test('returns null when fast not found', () => {
    const state = helper.getSampleState();
    expect(selectors.getFast(state, 'xyz')).toBe(null);
  });

  test('returns desired fast record', () => {
    const state = helper.getSampleState();
    const expected = state.fasts.byId['abc'];
    expect(selectors.getFast(state, 'abc')).toEqual(expected);
  });
});

describe('getActiveFast', () => {
  test('returns null when no activeFastId', () => {
    const state = helper.getSampleState();
    expect(selectors.getActiveFast(state)).toBe(null);
  });

  test('returns null when activeFastId is invalid', () => {
    const state = helper.getSampleState();
    state.fasts.activeFastId = 'xyz';
    expect(selectors.getActiveFast(state)).toBe(null);
  });

  test('returns the active fast record', () => {
    const state = helper.getSampleState();
    state.fasts.activeFastId = 'abc';
    const expected = state.fasts.byId['abc'];
    expect(selectors.getActiveFast(state)).toEqual(expected);
  });
});

describe('getSettings', () => {
  test('returns settings state', () => {
    const state = helper.getSampleState();
    const result = selectors.getSettings(state);
    expect(result).toEqual(settingsInitialState);
  });
});
