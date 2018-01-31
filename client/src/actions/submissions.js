import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';


export const getSubmissions = (kind, callBack = () => {}) => {
  return dispatch => {
    axios.get(`/api/submissions?kind=${kind}`)
      .then(res => {
        dispatch({type: 'GET_SUBMISSIONS', submissions: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch(error => {
        dispatch(setHeaders(error.headers));
        dispatch(setFlash('Error', 'red'));
      });
  };
};

export const addSubmission = ( url, kind, callBack = () => {}) => {
  return dispatch => {
    axios.post('/api/submissions', { url, kind })
      .then(res => {
        dispatch({type: 'ADD_SUBMISSION', submission: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch(error => {
        dispatch(setHeaders(error.headers));
        dispatch(setFlash('Error', 'red'));
      });
  };
};
