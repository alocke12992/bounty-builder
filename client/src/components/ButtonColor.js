import React, {Fragment} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {SketchPicker} from 'react-color';
import {updateSettings} from '../actions/settings'
import {Button, Container, Divider, Grid, Dropdown, Header} from 'semantic-ui-react';
import StyledButton from '../styledcomponents/StyledButton';
import Wrapper from '../styledcomponents/StyledBackground';

class ButtonColor extends React.Component {
  state = {activeItem: 'Background'}

  buttonChange = (buttonColor) => {
    const {dispatch, id} = this.props
    const color = {theme_button_color: buttonColor.hex, id}
    dispatch(updateSettings(color))
  };

  fontChange = (fontColor) => {
    const {dispatch, id} = this.props
    const color = {theme_button_font_color: fontColor.hex, id}
    dispatch(updateSettings(color))
  }
  borderChange = (borderColor) => {
    const {dispatch, id} = this.props
    const color = {theme_button_border_color: borderColor.hex, id}
    dispatch(updateSettings(color))
  }


  toggleView = (e, {name}) => {
    this.setState({activeItem: name})
  }

  editBackground = () => {
    return (
      <Fragment>
        <SketchPicker
          color={this.props.buttonColor}
          onChangeComplete={this.buttonChange}
        />
      </Fragment>
    )
  }

  editFont = () => {
    return (
      <Fragment>
        <SketchPicker
          style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important"}}
          color={this.props.fontColor}
          onChangeComplete={this.fontChange}
        />
      </Fragment>
    )
  }
  editBorder = () => {
    return (
      <Fragment>
        <SketchPicker
          style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important"}}
          color={this.props.borderColor}
          onChangeComplete={this.borderChange}
        />
      </Fragment>
    )
  }

  render() {
    const {buttonColor, fontColor, borderColor} = this.props;
    const {activeItem} = this.state
    return (
      <Grid stackable centered columns={3}>
        <Divider hidden />
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' textAlign='center'>Button {activeItem} Color</Header>
            <Divider />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Dropdown text='Select'>
              <Dropdown.Menu>
                <Dropdown.Item text='Button Background' name='Background' active={activeItem === 'Background'} onClick={this.toggleView} />
                <Dropdown.Item text='Button Font' name='Font' active={activeItem === 'Font'} onClick={this.toggleView} />
                <Dropdown.Item text='Button Border' name='Border' active={activeItem === 'Border'} onClick={this.toggleView} />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
          <Grid.Column>
            <Divider hidden />
            <StyledButton
              backgroundColor={this.props.buttonColor}
              fontColor={this.props.fontColor}
              border={this.props.borderColor}
              size='huge'
            >
              Example Button
            </StyledButton>
            <Divider hidden />
            {activeItem === 'Background' && this.editBackground()}
            {activeItem === 'Font' && this.editFont()}
            {activeItem === 'Border' && this.editBorder()}
          </Grid.Column>
          <Grid.Column>
            <Container textAlign='center'>
              <h3>Background Color</h3>
              <Divider />
              <Swatch
                name='Background'
                active={activeItem === 'Background'}
                onClick={this.toggleView}
              >
                <Wrapper color={buttonColor}>
                </Wrapper>
              </Swatch>
            </Container>
            <Divider hidden />
            <Container textAlign='center'>
              <h3>Font Color</h3>
              <Divider />
              <Swatch
                name='Font'
                active={activeItem === 'Font'}
                onClick={this.toggleView}
              >
                <Wrapper color={fontColor}>
                </Wrapper>
              </Swatch>
            </Container>
            <Divider hidden />
            <Container textAlign='center'>
              <h3>Border Color</h3>
              <Divider />
              <Swatch
                name='Border'
                active={activeItem === 'Border'}
                onClick={this.toggleView}
              >
                <Wrapper color={borderColor}>
                </Wrapper>
              </Swatch>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Divider hidden />
      </Grid>
    );
  }
}

const Swatch = styled(Button) `
  background: transparent !important;
  height: 100% !important;
  width: 100% !important; 
  padding: 0 !important;
  margin: 0 !important;
`

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    buttonColor: settings.theme_button_color,
    fontColor: settings.theme_button_font_color,
    borderColor: settings.theme_button_border_color,

  };
};

export default connect(mapStateToProps)(ButtonColor);