import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RightNavs from './RightNavs'
import {
  Dropdown,
  Image,
  Menu,
  Responsive,
  Container,
} from 'semantic-ui-react';

class MobileNavBar extends Component {
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
          <Dropdown.Menu>
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
            src={logo}
            style={{height: '50px', width: 'auto'}}
            onClick={() =>
              this.props.history.push('/')
            }
            alt="HN Text"
            maxWidth={767}
          />
        </Menu.Item>
        <Container>
          <RightNavs />
        </Container>
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

const StyledMenu = styled(Menu) `
  background: ${(props) => props.themecolor} !important;
  height: '100px';
  align-items
`;

export default withRouter(
  connect(mapStateToProps)(MobileNavBar)
);
