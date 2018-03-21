import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import submissions from './submissions';
import rewards from './rewards';
import color from './color'

const rootReducer = combineReducers( {
  user,
  flash,
  submissions,
  rewards,
  color,
} );

export default rootReducer;
