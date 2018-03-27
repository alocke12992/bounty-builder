import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Responsive,
} from 'semantic-ui-react';

class NavBar extends Component {
  routes = [
    {
      name: 'Dashboard',
      path: '/',
    },
    {
      name: 'Settings',
      path: '/settings',
    },
    {
      name: 'About Campaign',
      path: '/rules',
    },
    {
      name: 'Facebook',
      path: '/facebook',
    },
    {
      name: 'Twitter',
      path: '/twitter',
    },
    {
      name: 'LinkedIn',
      path: '/linkedin',
    },
    {
      name: 'Reddit',
      path: '/reddit',
    },
    {
      name: 'Influencer',
      path: '/influencer',
    },
    {
      name: 'Translation',
      path: '/translation',
    },
  ];

  logout = ( { dispatch, history } ) => {
    return (
      <Dropdown.Item
        onClick={ () =>
          dispatch( handleLogout( history ) )
        }>
        Logout
      </Dropdown.Item>
    );
  };
  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if ( user.id ) {
      return (
        <Menu.Menu position="right">
          <Dropdown
            item
            text={ user.email }
            style={ styles.text }>
            <Dropdown.Menu>
              { user.role === 'admin' && (
                <Dropdown.Item
                  onClick={ () =>
                    history.push( '/admin' )
                  }>
                  Admin
                </Dropdown.Item>
              ) }
              { user.role === 'admin' && (
                <Dropdown.Item
                  onClick={ () =>
                    history.push( '/moderate' )
                  }>
                  Moderate
                </Dropdown.Item>
              ) }
              <Dropdown.Item
                onClick={ () =>
                  history.push( '/settings' )
                }>
                Settings
              </Dropdown.Item>
              <Dropdown.Item
                onClick={ () => history.push( '/rules' ) }>
                About Campaign
              </Dropdown.Item>
              { this.logout( { dispatch, history } ) }
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position="right">
        <Menu.Item
          as={ Link }
          to="/register"
          name="Register"
          style={ styles.text }
        />
        <Menu.Item
          as={ Link }
          to="/login"
          name="Login"
          style={ styles.text }
        />
      </Menu.Menu>
    );
  };

  render() {
    const {
      user,
      dispatch,
      history,
      backgroundColor,
    } = this.props;
    return (
      <StyledMenu
        pointing
        secondary
        themecolor={ backgroundColor }>
        <Responsive
          as={ Dropdown }
          maxWidth={ 767 }
          item
          icon="content">
          <Dropdown.Menu>
            { user.role === 'admin' && (
              <Dropdown.Item
                onClick={ () => history.push( '/admin' ) }>
                Admin
              </Dropdown.Item>
            ) }
            { user.role === 'admin' && (
              <Dropdown.Item
                onClick={ () =>
                  history.push( '/moderate' )
                }>
                Moderate
              </Dropdown.Item>
            ) }
            { this.routes.map( ( route, i ) => {
              return (
                <Dropdown.Item
                  key={ i }
                  onClick={ () =>
                    history.push( `${ route.path }` )
                  }>
                  { route.name }
                </Dropdown.Item>
              );
            } ) }
            { this.logout( { dispatch, history } ) }
          </Dropdown.Menu>
        </Responsive>
        <Menu.Item>
          <Responsive
            as={ Image }
            src={ require( '../assets/images/logo-white.svg' ) }
            style={ { height: '60px', width: 'auto' } }
            onClick={ () =>
              this.props.history.push( '/' )
            }
            alt="HN Text"
            minWidth={ 768 }
          />
          <Responsive
            as={ Image }
            src={ require( '../assets/images/logo-white.svg' ) }
            style={ { height: '50px', width: 'auto' } }
            onClick={ () =>
              this.props.history.push( '/' )
            }
            alt="HN Text"
            maxWidth={ 767 }
          />
        </Menu.Item>
        <Responsive as={ Container } minWidth={ 768 }>
          { this.rightNavs() }
        </Responsive>
      </StyledMenu>
    );
  }
}

var styles = {
  text: {
    color: 'white',
  },
  logo: {
    width: '75px',
    height: '75px',
  },
};

const StyledMenu = styled( Menu ) `
  background: ${( props ) =>
    props.themecolor } !important;
  height: '100px';
`;

const mapStateToProps = ( state ) => {
  return {
    user: state.user,
    backgroundColor: state.navColor,
  };
};

export default withRouter(
  connect( mapStateToProps )( NavBar ),
);
