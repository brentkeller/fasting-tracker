import cloneDeep from 'lodash.clonedeep';
import { LocalDateTime, ZoneOffset } from 'js-joda';
import { createTransform } from 'redux-persist';
//import { REHYDRATE } from 'redux-persist';
import { calculateDuration } from 'common/date';

export const ADD_FAST = 'app/fasts/ADD_FAST';
export const END_FAST = 'app/fasts/END_FAST';
export const DELETE_FAST = 'app/fasts/DELETE_FAST';

export const initialState = {
  activeFastId: null,
  byId: {},
  allIds: [],
};

export default function fasts(state = initialState, action) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case ADD_FAST: {
      newState.byId[action.fast.id] = action.fast;
      newState.allIds.push(action.fast.id);
      if (!action.fast.end) newState.activeFastId = action.fast.id;
      return newState;
    }

    case DELETE_FAST: {
      delete newState.byId[action.id];
      newState.allIds = newState.allIds.filter(x => x != action.id);
      if (newState.activeFastId === action.id) newState.activeFastId = null;
      return newState;
    }

    case END_FAST: {
      if (!state.activeFastId) return state;
      const fast = {
        ...state.byId[state.activeFastId],
        end: LocalDateTime.now(ZoneOffset.UTC),
      };
      fast.duration = calculateDuration(fast.start, fast.end);
      newState.activeFastId = null;
      newState.byId[fast.id] = fast;
      return newState;
    }

    // For debugging redux-persist
    // case REHYDRATE: {
    //   console.log('rehydrated fasts', action);
    //   return state;
    // }

    default:
      return newState;
  }
}

// Action Creators

export const addFast = fast => ({ type: ADD_FAST, fast });

export function beginFast() {
  const now = LocalDateTime.now(ZoneOffset.UTC);
  const fast = {
    id: now.toEpochSecond(ZoneOffset.UTC),
    start: now,
  };
  return addFast(fast);
}

export const endFast = () => ({ type: END_FAST });

export const deleteFast = id => ({ type: DELETE_FAST, id });

// Persistence helpers

export function serializeFast(fast) {
  return {
    ...fast,
    start: !fast.start ? null : fast.start.toEpochSecond(ZoneOffset.UTC),
    end: !fast.end ? null : fast.end.toEpochSecond(ZoneOffset.UTC),
  };
}

export function deserializeFast(fast) {
  return {
    ...fast,
    start: !fast.start
      ? null
      : LocalDateTime.ofEpochSecond(fast.start, ZoneOffset.UTC),
    end: !fast.end
      ? null
      : LocalDateTime.ofEpochSecond(fast.end, ZoneOffset.UTC),
  };
}

export const fastTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, stateKey) => {
    const byId = { ...inboundState.byId };
    for (var key in byId) {
      if (!byId.hasOwnProperty(key)) continue;
      byId[key] = serializeFast(byId[key]);
    }
    const newState = {
      ...inboundState,
      byId,
    };
    return newState;
  },

  // transform state being rehydrated
  (outboundState, stateKey) => {
    const byId = { ...outboundState.byId };
    for (var key in byId) {
      if (!byId.hasOwnProperty(key)) continue;
      byId[key] = deserializeFast(byId[key]);
    }
    const newState = {
      ...outboundState,
      byId,
    };
    return newState;
  },

  // define which reducers this transform gets called for.
  { whitelist: ['fasts'] },
);
