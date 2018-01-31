import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminModeratorRoute = ({ role, isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated && ( role === 'admin' || role === 'moderator' )
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

export default connect(mapStateToProps)(AdminModeratorRoute);
