import reducer, {
  initialState,
  SET_SETTING,
  setDateTimeFormat,
  setSetting,
} from './settings';

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

describe('setDateTimeFormat', () => {
  test('sets dateTimeFormat using dateFormat', () => {
    const state = getState();
    expect(state.dateTimeFormat).toEqual('ddd MMM DD, YYYY h:mm a');
    state.dateFormat = 'YYYY.MM.DD';
    setDateTimeFormat(state);
    expect(state.dateTimeFormat).toEqual('YYYY.MM.DD h:mm a');
  });

  test('sets dateTimeFormat using use24HrClock', () => {
    const state = getState();
    expect(state.dateTimeFormat).toEqual('ddd MMM DD, YYYY h:mm a');
    state.use24HrClock = true;
    setDateTimeFormat(state);
    expect(state.dateTimeFormat).toEqual('ddd MMM DD, YYYY HH:mm');
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

    test('update dateTimeFormat when clock type changes', () => {
      const name = 'use24HrClock',
        value = true;
      const action = setSetting(name, value);
      const state = getState();
      expect(state.dateTimeFormat).toEqual('ddd MMM DD, YYYY h:mm a');
      const result = reducer(state, action);
      expect(result.dateTimeFormat).toEqual('ddd MMM DD, YYYY HH:mm');
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
