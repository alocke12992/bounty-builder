import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import submissions from './submissions';
import rewards from './rewards';
import navColor from './navColor'
import buttonColor from './buttonColor'
import backgroundColor from './backgroundColor'

const rootReducer = combineReducers( {
  user,
  flash,
  submissions,
  rewards,
  navColor,
  backgroundColor,
  buttonColor,
} );

export default rootReducer;
