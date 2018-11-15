import reducer, {
  initialState,
  ADD_FAST,
  END_FAST,
  addFast,
  beginFast,
  endFast,
  serializeFast,
  deserializeFast,
} from './fasts';
import { LocalDateTime, ZoneOffset } from 'js-joda';
import * as helper from 'common/testHelper';

function getState(state = initialState) {
  return { ...state };
}

describe('addFast', () => {
  test('returns action of type ADD_FAST', () => {
    const fast = helper.createFast();
    const action = addFast(fast);
    expect(action.type).toEqual(ADD_FAST);
    expect(action.fast).toEqual(fast);
  });
});

describe('beginFast', () => {
  test('returns action of type ADD_FAST', () => {
    const action = beginFast();
    expect(action.type).toEqual(ADD_FAST);
    expect(action.fast.start).not.toBeNull();
  });
});

describe('endFast', () => {
  test('returns action of type END_FAST', () => {
    const action = endFast();
    expect(action.type).toEqual(END_FAST);
  });
});

describe('serializeFast', () => {
  test('should serialize null dates properly', () => {
    const fast = helper.createFast('abc');
    const result = serializeFast(fast);
    const expected = { end: null, id: 'abc', start: null };
    expect(result).toEqual(expected);
  });
  test('should serialize dates properly', () => {
    const fast = helper.createFast(
      'abc',
      helper.SAMPLE_START_STRING,
      helper.SAMPLE_END_STRING,
    );
    const expected = {
      end: helper.SAMPLE_END_EPOCH,
      id: 'abc',
      start: helper.SAMPLE_START_EPOCH,
    };
    const result = serializeFast(fast);
    expect(result).toEqual(expected);
  });
});

describe('deserializeFast', () => {
  test('should deserialize null dates properly', () => {
    const expected = helper.createFast('abc');
    const dehydratedFast = { end: null, id: 'abc', start: null };
    const result = deserializeFast(dehydratedFast);
    expect(result).toEqual(expected);
  });
  test('should deserialize dates properly', () => {
    const expected = helper.createFast(
      'abc',
      helper.SAMPLE_START_STRING,
      helper.SAMPLE_END_STRING,
    );
    const fast = {
      end: helper.SAMPLE_END_EPOCH,
      id: 'abc',
      start: helper.SAMPLE_START_EPOCH,
    };
    const result = deserializeFast(fast);
    expect(result).toEqual(expected);
  });
});

describe('fasts reducer', () => {
  describe('ADD_FAST', () => {
    test('adds given state to store', () => {
      const fast = helper.createFast(
        'abc',
        helper.SAMPLE_START_STRING,
        helper.SAMPLE_END_STRING,
      );
      const action = addFast(fast);
      const state = getState();
      const result = reducer(state, action);
      expect(result.byId['abc']).toEqual(fast);
      expect(result.allIds).toHaveLength(1);
      expect(result.activeFastId).toBeNull();
    });
    test('sets active fast when given fast has no end date', () => {
      const fast = helper.createFast('def', helper.SAMPLE_START_STRING);
      const action = addFast(fast);
      const state = getState();
      const result = reducer(state, action);
      expect(result.byId[fast.id]).toEqual(fast);
      expect(result.allIds).toHaveLength(1);
      expect(result.activeFastId).not.toBeNull();
    });
  });

  describe('END_FAST', () => {
    test('sets end for active fast', () => {
      const state = helper.getPopulatedFasts();
      state.activeFastId = state.allIds[0];
      const fast = state.byId[state.activeFastId];
      const action = endFast();
      const result = reducer(state, action);
      expect(result.byId[fast.id].end).not.toBeNull();
    });
    test('unsets active fast', () => {
      const state = helper.getPopulatedFasts();
      state.activeFastId = state.allIds[0];
      const fast = state.byId[state.activeFastId];
      const action = endFast();
      const result = reducer(state, action);
      expect(result.activeFastId).toBeNull();
    });
  });

  describe('default', () => {
    test('returns identical state when action is not handled', () => {
      const state = getState();
      const result = reducer(state, { type: 'foo' });
      expect(result).toEqual(initialState);
    });
  });
});
