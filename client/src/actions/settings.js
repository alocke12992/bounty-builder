import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const fetchSettings  = ( cb = () => {} ) => {
  return(dispatch) => {
    axios.get('/api/settings')
      .then( res => {
        dispatch({ type: 'FETCH_SETTINGS', settings: res.data });
        dispatch(setHeaders(res.headers));
      })
      .catch( res => {
        dispatch(setHeaders(res.headers));
      })
      .then( () => {
        cb();
      })
  }
};