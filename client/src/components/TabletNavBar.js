import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RightNavs from './RightNavs'
import {
  Dropdown,
  Image,
  Menu,
  Container,
} from 'semantic-ui-react';

class TabletNavBar extends Component {
  render() {
    const {
      history,
      backgroundColor,
      logo,
    } = this.props;

    return (
      <StyledMenu
        secondary
        fixed='top'
        themecolor={backgroundColor}
      >
        <Dropdown
          item
          icon='content'
        >
          <Dropdown.Menu
            style={{overflow: 'visible !important'}}
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
            style={{height: '70px'}}
            onClick={() =>
              this.props.history.push('/')
            }
            alt="HN Text"
          />
        </div>
        <div>
          <RightNavs />
        </div>
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

const StyledMenu = styled.div`
  background: ${(props) => props.themecolor} !important;
  justify-content: space-around !important;
  align-items: center !important;
  display: flex !important;
  position: fixed !important;
  top: 0 !important;
  width: 100% !important;
  z-index: 1;
`;

export default withRouter(
  connect(mapStateToProps)(TabletNavBar)
);
