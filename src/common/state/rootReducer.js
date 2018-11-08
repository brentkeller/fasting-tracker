import { combineReducers } from 'redux';
import fasts from './ducks/fasts';

const rootReducer = combineReducers({
  fasts,
});

export default rootReducer;
