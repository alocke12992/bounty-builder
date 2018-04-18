import React from 'react';
import {connect} from 'react-redux';
import {handleLogout} from '../actions/auth';
import {Link, withRouter} from 'react-router-dom';
import {
  Dropdown,
  Menu,
  Responsive,
} from 'semantic-ui-react';

class RightNavs extends React.Component {
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
    const {history} = this.props
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
    const {history} = this.props
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
  render() {
    const {dispatch, history, user, } = this.props;
    if (user.id) {
      return (
        <Menu.Menu position="right">
          <Responsive
            item
            minWidth={992}
            text={user.email}
            as={Dropdown}
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
          </Responsive>
          <Responsive
            item
            icon='angle down'
            maxWidth={991}
            as={Dropdown}
            style={styles.text}
          >
            <Dropdown.Menu
              style={{left: '-125px', zIndex: '1'}}
            >
              {user.role === 'dev' && this.devRouteMap()}
              {((user.role === 'dev') || (user.role === 'admin')) && this.adminRouteMap()}
              <Dropdown.Item
                onClick={() => history.push('/rules')}>
                About Campaign
              </Dropdown.Item>
              {this.logout({dispatch, history})}
            </Dropdown.Menu>
          </Responsive >
        </Menu.Menu >
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
};
const mapStateToProps = (state) => {
  const {settings} = state
  return {
    backgroundColor: settings.theme_nav_color,
    user: state.user,
    logo: settings.theme_logo,
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
    name: 'Moderate',
    path: '/moderate',
  },
]

var styles = {
  logo: {
    height: '75px',
    width: '75px',
  },
  text: {
    color: 'white',
  },
};

export default withRouter(
  connect(mapStateToProps)(RightNavs)
);