import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ role, isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated && role === 'admin'
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
  return { isAuthenticated: state.user.id, role: state.user.role };
};

export default connect(mapStateToProps)(AdminRoute);
