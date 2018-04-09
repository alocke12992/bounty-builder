import React from 'react';
import styled from 'styled-components';
import StyledLogo from '../styledcomponents/StyledLogo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RightNavs from './RightNavs';
import {
  Container,
  Image,
  Menu,
  Responsive,
} from 'semantic-ui-react';
class LaptopNavBar extends React.Component {

  render() {
    const {
      backgroundColor,
      logo,
    } = this.props;
    return (
      <StyledMenu
        pointing
        secondary
        themecolor={backgroundColor}>
        <Menu.Item>
          <Responsive
            as={StyledLogo}
            src={logo}
            onClick={() =>
              this.props.history.push('/')
            }
            alt="HN Text"
          />
        </Menu.Item>
        <Responsive as={Container} minWidth={768}>
          <RightNavs />
        </Responsive>
      </StyledMenu>
    );
  }
};
const mapStateToProps = (state) => {
  const {settings} = state
  return {
    backgroundColor: settings.primary_color,
    logo: settings.logo_url,
  };
};

const StyledMenu = styled(Menu) `
  background: ${(props) => props.themecolor} !important;
    align-items;
`;
export default withRouter(
  connect(mapStateToProps)(LaptopNavBar)
);