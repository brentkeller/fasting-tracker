import { LocalDateTime, ZoneOffset, ChronoUnit } from 'js-joda';
import { createTransform } from 'redux-persist';
import { REHYDRATE } from 'redux-persist';
import { calculateDuration } from 'common/date';

export const ADD_FAST = 'app/fasts/ADD_FAST';
export const END_FAST = 'app/fasts/END_FAST';

const initialState = {
  byId: {},
  allIds: [],
};

export default function fasts(state = initialState, action) {
  switch (action.type) {
    case ADD_FAST: {
      const newState = { ...state };
      newState.byId[action.fast.id] = action.fast;
      newState.allIds.push(action.fast.id);
      if (!action.fast.endDate) newState.activeFastId = action.fast.id;
      return newState;
    }

    case END_FAST: {
      if (!state.activeFastId) return state;
      const fast = {
        ...state.byId[state.activeFastId],
        end: LocalDateTime.now(ZoneOffset.UTC),
      };
      fast.duration = calculateDuration(fast.start, fast.end);
      const newState = {
        ...state,
        activeFastId: null,
      };
      newState.byId[fast.id] = fast;
      return newState;
    }

    // For debugging redux-persist
    // case REHYDRATE: {
    //   console.log('rehydrated fasts', action);
    //   return state;
    // }

    default:
      return state;
  }
}

// Action Creators

export function addFast(fast) {
  return { type: ADD_FAST, fast };
}

export function beginFast() {
  const now = LocalDateTime.now(ZoneOffset.UTC);
  const fast = {
    id: now.toEpochSecond(ZoneOffset.UTC),
    start: now,
  };
  return addFast(fast);
}

export function endFast() {
  return { type: END_FAST };
}

// Selectors

export const getFasts = state =>
  state.fasts.allIds.map(x => {
    return state.fasts.byId[x];
  });

export const getFast = (state, id) => ({ ...state.fasts.byId[id] });

export const getActiveFast = state => ({
  ...state.fasts.byId[state.fasts.activeFastId],
});

// Persistence helpers

function serializeFast(fast) {
  return {
    ...fast,
    start: !fast.start ? null : fast.start.toEpochSecond(ZoneOffset.UTC),
    end: !fast.end ? null : fast.end.toEpochSecond(ZoneOffset.UTC),
  };
}

function deserializeFast(fast) {
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
