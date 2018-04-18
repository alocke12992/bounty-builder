import React, {Component} from 'react';
import StyledMenu from '../styledcomponents/StyledMenu';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RightNavs from './RightNavs'
import {
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react';

class MobileNavBar extends Component {
  render() {
    const {
      history,
      backgroundColor,
      logo,
    } = this.props;

    return (
      <Menu
        as={StyledMenu}
        secondary
        fixed='top'
        themecolor={backgroundColor}
      >
        <Dropdown
          item
          icon='content'
        >
          <Dropdown.Menu
          >
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
          </Dropdown.Menu>
        </Dropdown>
        <div>
          <Image
            src={logo}
            style={{height: '50px'}}
            onClick={() =>
              this.props.history.push('/')
            }
            alt="HN Text"
          />
        </div>
        <div>
          <RightNavs />
        </div>
      </Menu>
    );
  }
};

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    backgroundColor: settings.theme_nav_color,
    user: state.user,
    logo: settings.theme_logo,
  };
};

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

export default withRouter(
  connect(mapStateToProps)(MobileNavBar)
);