import { combineReducers } from 'redux';
import flash from './flash';
import rewards from './rewards';
import navColor from './navColor'
import buttonColor from './buttonColor'
import backgroundColor from './backgroundColor'
import settings from './settings';
import submissions from './submissions';
import user from './user';

const rootReducer = combineReducers( {
  flash,
  rewards,
  navColor,
  backgroundColor,
  buttonColor,
  settings,
  submissions,
  user,
} );

export default rootReducer;
