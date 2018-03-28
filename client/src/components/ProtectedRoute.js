import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />)
    )}
  />
);

const mapStateToProps = state => {
  return { isAuthenticated: state.user.id };
};

export default connect(mapStateToProps)(ProtectedRoute);
