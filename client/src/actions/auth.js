import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

const login = user => {
  return { type: 'LOGIN', user };
};

const logout = () => {
  return { type: 'LOGOUT' };
};

export const registerUser = (email, password, passwordConfirmation, history, invite_code) => {
  return dispatch => {
    axios.post('/api/auth', { email, password, password_confirmation: passwordConfirmation, incoming_invite_code: invite_code })
      .then(res => {
        const { data: { data: user }, headers } = res;
        dispatch(setHeaders(headers));
        setTimeout(function(){
          dispatch(login(user));
          history.push('/');
        }, 500);
      })
      .catch(res => {
        const messages =
          res.response.data.errors.full_messages.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const handleLogout = history => {
  return dispatch => {
    axios.delete('/api/auth/sign_out')
      .then(res => {
        const { headers } = res;
        dispatch(logout());
        dispatch(setFlash('Logged out successfully!', 'green'));
        dispatch(setHeaders(headers));
        history.push('/login');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const handleLogin = (email, password, history) => {
  return dispatch => {
    axios.post('/api/auth/sign_in', { email, password })
      .then(res => {
        const { data: { data: user }, headers } = res;
        dispatch(setHeaders(headers));
        setTimeout(function(){
          dispatch(login(user));
          history.push('/');
        }, 500);
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const validateToken = (callBack = () => {}) => {
  return dispatch => {
    dispatch({ type: 'VALIDATE_TOKEN' });
    const headers = axios.defaults.headers.common;
    axios.get('/api/auth/validate_token', headers)
      .then(res => {
        const user = res.data.data;
        dispatch(login(user));
        dispatch(setHeaders(res.headers));
      })
      .catch(() => callBack());
  };
};

export const sendPasswordReset = (email, cb = () => {}) => {
  return dispatch => {
    axios.post('/api/passwords/send_password_reset', { email })
    .then(res => {
      dispatch(setHeaders(res.headers));
      cb();
    })
    .catch(err => {
      dispatch(setFlash('An error occurred.', 'red'));
      dispatch(setHeaders(err.headers));
    })
  }
}

export const recoverPassword = (password, passwordConfirmation, token, history) => {
  return dispatch => {
    axios.post('/api/passwords/set_new_password', { password, token, password_confirmation: passwordConfirmation})
    .then( res => {
      dispatch(setHeaders(res.headers));
      dispatch(setFlash(res.data, 'green'));
      history.push('/login');
    })
    .catch( err => {
      const messages = err.response.data.errors;
      dispatch(setFlash(messages, 'red'));
      dispatch(setHeaders(err.headers));
    })
  }
}
