import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, } from 'react-router-dom';

const AdminRoute = ({ role, isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated && ((role === 'admin') || (role === 'dev'))
        ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />)
    )}
  />
);

const mapStateToProps = state => {
  return { 
    isAuthenticated: state.user.id,
    role: state.user.role 
  };
};

export default connect(mapStateToProps)(AdminRoute);
