import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import blogs from './blogs';

const rootReducer = combineReducers({
  user,
  flash,
  blogs,
});

export default rootReducer;
