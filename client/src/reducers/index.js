import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import submissions from './submissions';
import rewards from './rewards';

const rootReducer = combineReducers({
  user,
  flash,
  submissions,
  rewards,
});

export default rootReducer;
