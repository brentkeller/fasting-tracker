import { combineReducers } from 'redux';
import fasts from './fasts/fasts';

const rootReducer = combineReducers({
  fasts,
});

export default rootReducer;
