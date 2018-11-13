import { initialState, ADD_FAST, addFast } from './fasts';
import { LocalDateTime, ZoneOffset } from 'js-joda';
import * as helper from 'common/testHelper';

const fastState = {
  byId: {},
  allIds: [],
};

describe('addFast', () => {
  test('returns action of type ADD_FAST', () => {
    const fast = helper.createFast();
    const action = addFast(fast);
    expect(action.type).toEqual(ADD_FAST);
    expect(action.fast).toEqual(fast);
  });
});
