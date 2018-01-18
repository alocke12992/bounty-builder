import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';


export const getBlogs = (callBack = () => {}) => {
  return dispatch => {
    axios.get('/api/blogs')
      .then(res => {
        dispatch({type: 'GET_BLOGS', blogs: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch(error => {
        dispatch(setHeaders(error.headers));
      });
  };
};

export const addBlog = ( url, callBack = () => {}) => {
  return dispatch => {
    axios.post('/api/blogs', { url })
      .then(res => {
        dispatch({type: 'ADD_BLOG', blog: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch(error => {
        dispatch(setHeaders(error.headers));
      });
  };
};
