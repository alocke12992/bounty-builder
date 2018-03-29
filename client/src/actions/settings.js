import axios from 'axios';
import {setFlash} from '../actions/flash';
import {setHeaders} from '../actions/headers';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const FETCH_SETTINGS = 'FETCH_SETTINGS';

export const fetchSettings = (cb = () => {}) => {
  return (dispatch) => {
    axios
      .get('/api/settings')
      .then((res) => {
        dispatch({
          type: FETCH_SETTINGS,
          settings: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
      .then(() => {
        cb();
      });
  };
};

export const updateSettings = (settings) => {
  return (dispatch) => {
    axios
      .put(`/api/settings/${settings.id}`, {
        settings,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_SETTINGS,
          settings: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      });
  };
};
