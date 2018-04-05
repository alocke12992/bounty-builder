
import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {handleLogout} from '../actions/auth';
import {Link, withRouter} from 'react-router-dom';
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

  adminRouteMap = () => {
    const {history, user} = this.props
    return adminRoutes.map((adminRoute, i) => {
      return (
        <Dropdown.Item
          key={i}
          onClick={() =>
            history.push(`${adminRoute.path}`)
          }
        >
          {adminRoute.name}
        </Dropdown.Item>
      )
    })
  }

  devRouteMap = () => {
    const {history, user} = this.props
    return devRoutes.map((devRoute, i) => {
      return (
        <Dropdown.Item
          key={i}
          onClick={() =>
            history.push(`${devRoute.path}`)
          }
        >
          {devRoute.name}
        </Dropdown.Item>
      )
    })
  }

  rightNavs = () => {
    const {dispatch, history, user, } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position="right">
          <Dropdown
            item
            text={user.email}
            style={styles.text}
          >
            <Dropdown.Menu>
              {user.role === 'dev' && this.devRouteMap()}
              {((user.role === 'dev') || (user.role === 'admin')) && this.adminRouteMap()}
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
    return (
      <Fragment>
        <Responsive
          as={Dropdown}
          maxWidth={767}
          item
          icon="content">
          <Dropdown.Menu>
            {user.role === 'dev' && this.devRouteMap()}
            {((user.role === 'dev') || (user.role === 'admin')) && this.adminRouteMap()}
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
        <Responsive
          as='div'
          maxWidth={991}
          style={{marginBottom: '80px'}}
        >
          <MobileNavBar />
        </Responsive>
      </Fragment>
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

const devRoutes = [
  {
    name: 'Settings',
    path: '/settings',
  },
]

const adminRoutes = [
  {
    name: 'Admin',
    path: '/admin',
  },
  {
    name: 'Moderate',
    path: '/moderate',
  },
]

const routes = [
  {
    name: 'Dashboard',
    path: '/',
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
