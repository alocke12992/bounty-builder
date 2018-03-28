import {
  FETCH_SETTINGS,
  UPDATE_SETTINGS,
} from '../actions/settings';

const settings = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SETTINGS:
      return action.settings;
    case UPDATE_SETTINGS:
      return action.settings;
    default:
      return state;
  }
};

export default settings;
