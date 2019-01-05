export const getFasts = state =>
  state.fasts.allIds.map(x => state.fasts.byId[x]);

export const getFast = (state, id) =>
  id in state.fasts.byId ? { ...state.fasts.byId[id] } : null;

export const getActiveFast = state =>
  state.fasts.activeFastId in state.fasts.byId
    ? { ...state.fasts.byId[state.fasts.activeFastId] }
    : null;

export const getFastStats = state => state.fasts.stats;

export const getSettings = state => state.settings;
