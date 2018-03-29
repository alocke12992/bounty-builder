import { combineReducers } from 'redux';
import flash from './flash';
import rewards from './rewards';
import navColor from './navColor'
import buttonColor from './buttonColor'
import settings from './settings';
import submissions from './submissions';
import user from './user';

const rootReducer = combineReducers({
  flash,
  rewards,
  navColor,
  buttonColor,
  settings,
  submissions,
  user,
});

export default rootReducer;
