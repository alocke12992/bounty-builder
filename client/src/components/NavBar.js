import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';

class NavBar extends Component {
  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position='right'>
        <Dropdown item text={user.email} style={styles.text}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => history.push('/about')}>About Campaign</Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(handleLogout(history))}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position='right'>
        <Menu.Item as={Link} to='/register' name='Register' style={styles.text}/>
        <Menu.Item as={Link} to='/login' name='Login' style={styles.text}/>
      </Menu.Menu>
    );
  }

  render() {
    return (
      <Menu pointing secondary style={styles.base}>
        <Menu.Item>
          <img
            src={require('../assets/images/HN_token_transparent.png')}
            style={styles.logo}
            onClick={() => this.props.history.push('/')}
            alt='HN Token'
          />
        </Menu.Item>
        { this.rightNavs() }
      </Menu>
    );
  }
}

var styles = {
  base: {
    background: '#3685b5',
    height: '100px',
  },
  text: {
    color: 'white'
  },
  logo: {
    width: '75px',
    height: '75px'
  }
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
