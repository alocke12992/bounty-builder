import React, {Fragment} from 'react';
import ButtonColor from './ButtonColor';
import LogoUploader from './LogoUploader';
import NavColor from './NavColor';
import {connect} from 'react-redux';
import {Button, Divider, Grid, Segment, Menu, Sidebar, Icon} from 'semantic-ui-react';
import MenuItem from '../styledcomponents/SideBarButton';
import styled from 'styled-components';

class ThemeOptions extends React.Component {

  state = {
    activeItem: 'Nav'
  };

  handleItemClick = (e, {name, active}) => {
    this.setState({activeItem: name})
  }

  navColor = () => {
    return <NavColor />
  }

  buttonColor = () => {
    return <ButtonColor />
  }

  logoUploader = () => {
    return <LogoUploader />
  }

  render() {
    const {activeItem} = this.state
    return (
      <Grid>
        <Row columns={2}>
          <SideBar width={2}>
            <Divider hidden />
            {buttons.map((button, i) => {
              return (
                <Fragment>
                  <MenuItem key={button.i}>
                    {
                      button.name === activeItem ?
                        <ActiveButton
                          name={button.name}
                          onClick={this.handleItemClick}
                        >
                          {button.name}
                        </ActiveButton>

                        :
                        <StyledButton
                          name={button.name}
                          onClick={this.handleItemClick}
                        >
                          {button.name}
                        </StyledButton>
                    }
                  </MenuItem>
                </Fragment>
              )
            })}
          </SideBar>
          <Grid.Column width={14}>
            {activeItem === 'Nav' && this.navColor()}
            {activeItem === 'Button' && this.buttonColor()}
            {activeItem === 'Logo' && this.logoUploader()}
          </Grid.Column>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    buttonColor: state.settings.theme_button_color,
    fontColor: state.settings.theme_button_font_color,
  };
};

const SideBar = styled(Grid.Column) `
  height: 100% !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
`

const Row = styled(Grid.Row) `
  padding-bottom: 0px !important;
  padding-top: 0px !important;
`
const StyledButton = styled(Button) `
  background-color: transparent !important;
  width: 100% !important;
  height: 100% !important;
`

const ActiveButton = StyledButton.extend`
-webkit-box-shadow: inset -1px 1px 2px 1px rgba(125,125,125,0.68) !important;
-moz-box-shadow: inset -1px 1px 2px 1px rgba(125,125,125,0.68) !important;
box-shadow: inset -1px 1px 2px 1px rgba(125,125,125,0.68) !important;
`

const buttons = [
  {
    name: 'Nav',
    active: true
  },
  {
    name: 'Button',
    active: false
  },
  {
    name: 'Logo',
    active: false
  }
]

export default connect(mapStateToProps)(ThemeOptions);