import { combineReducers } from 'redux';
import fasts from './fasts/fasts';
import settings from './settings/settings';

const rootReducer = combineReducers({
  fasts,
  settings,
});

export default rootReducer;
