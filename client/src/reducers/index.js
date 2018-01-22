import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import submissions from './submissions';

const rootReducer = combineReducers({
  user,
  flash,
  submissions,
});

export default rootReducer;
