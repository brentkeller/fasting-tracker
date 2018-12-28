import reducer, { initialState, SET_SETTING, setSetting } from './settings';
import * as helper from 'common/testHelper';

function getState(state = initialState) {
  return { ...state };
}

describe('setSetting', () => {
  test('returns action of type SET_SETTING', () => {
    const action = setSetting('name', 'foo');
    expect(action.type).toEqual(SET_SETTING);
    expect(action.name).toEqual('name');
    expect(action.value).toEqual('foo');
  });
});

describe('settings reducer', () => {
  describe('SET_SETTING', () => {
    test('sets value in store', () => {
      const name = 'use24HrClock',
        value = true;
      const action = setSetting(name, value);
      const state = getState();
      const result = reducer(state, action);
      expect(result[name]).toEqual(value);
    });
  });
  describe('Unknown action type', () => {
    test('returns current state', () => {
      const action = { type: 'UNKNOWN' };
      const state = getState();
      const result = reducer(state, action);
      expect(result).toEqual(state);
    });
  });
});
