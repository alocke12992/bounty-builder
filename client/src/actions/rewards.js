import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';


export const getRewards = (callBack = () => {}) => {
  return dispatch => {
    axios.get(`/api/rewards`)
      .then(res => {
        dispatch({type: 'GET_REWARDS', rewards: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch(error => {
        dispatch(setHeaders(error.headers));
      });
  };
};

export const addReward = ( value, source, reason, post_id = null) => {
  return dispatch => {
    axios.post('/api/rewards', { value, source, reason, post_id  } )
      .then( res => {
        dispatch({type: 'ADD_REWARD', reward: res.data})
        dispatch(setHeaders(res.headers));
        dispatch(setFlash('Completed', 'green'));
      })
      .catch( err => {
        const message = err.response.data.errors
        dispatch(setFlash(message, 'red'));
        dispatch(setHeaders(err.headers));
      })
  };
};
