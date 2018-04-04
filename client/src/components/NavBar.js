import React from 'react';
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

class NavBar extends React.Component {

  logout = ({dispatch, history}) => {
    return (
      <Dropdown.Item
        onClick={() =>
          dispatch(handleLogout(history))
        }>
        Logout
      </Dropdown.Item>
    );
  };

  rightNavs = () => {
    const { dispatch, history, user, } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position="right">
          <Dropdown
            item
            text={user.email}
            style={styles.text}>
            <Dropdown.Menu>
              {user.role === 'admin' && (
                <Dropdown.Item
                  onClick={() =>
                    history.push('/admin')
                  }>
                  Admin
                </Dropdown.Item>
              )}
              {user.role === 'admin' && (
                <Dropdown.Item
                  onClick={() =>
                    history.push('/moderate')
                  }>
                  Moderate
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={() =>
                  history.push('/settings')
                }>
                Settings
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history.push('/rules')}>
                About Campaign
              </Dropdown.Item>
              {this.logout({dispatch, history})}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/register"
          name="Register"
          style={styles.text}
        />
        <Menu.Item
          as={Link}
          to="/login"
          name="Login"
          style={styles.text}
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
      logo,
    } = this.props;

    return (
      <StyledMenu
        pointing
        secondary
        themecolor={backgroundColor}>
        <Responsive
          as={Dropdown}
          maxWidth={767}
          item
          icon="content">
          <Dropdown.Menu>
            {user.role === 'admin' && (
              <Dropdown.Item
                onClick={() => history.push('/admin')}>
                Admin
              </Dropdown.Item>
            )}
            {user.role === 'admin' && (
              <Dropdown.Item
                onClick={() =>
                  history.push('/moderate')
                }>
                Moderate
              </Dropdown.Item>
            )}
            {routes.map((route, i) => {
              return (
                <Dropdown.Item
                  key={i}
                  onClick={() =>
                    history.push(`${route.path}`)
                  }>
                  {route.name}
                </Dropdown.Item>
              );
            })}
            {this.logout({dispatch, history})}
          </Dropdown.Menu>
        </Responsive>
        <Menu.Item>
          <Responsive
            as={Image}
            src={logo}
            style={{height: '60px', width: 'auto'}}
            onClick={() =>
              this.props.history.push('/')
            }
            alt="HN Text"
            minWidth={768}
          />
          <Responsive
            as={Image}
            src={require('../assets/images/logo-white.svg')}
            style={{height: '50px', width: 'auto'}}
            onClick={() =>
              this.props.history.push('/')
            }
            alt="HN Text"
            maxWidth={767}
          />
        </Menu.Item>
        <Responsive as={Container} minWidth={768}>
          {this.rightNavs()}
        </Responsive>
      </StyledMenu>
    );
  }
};

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    backgroundColor: settings.primary_color,
    user: state.user,
    logo: settings.logo_url,
  };
};

const routes = [
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

var styles = {
  logo: {
    height: '75px',
    width: '75px',
  },
  text: {
    color: 'white',
  },
};

const StyledMenu = styled(Menu) `
  background: ${(props) => props.themecolor} !important;
  height: '100px';
`;

export default withRouter(
  connect(mapStateToProps)(NavBar)
);
