import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {SketchPicker} from 'react-color';
import {updateSettings, updateLogo} from '../actions/settings'
import {Button, Divider, Form, Grid, Image, Segment, } from 'semantic-ui-react';

class ColorPicker extends React.Component {

  state = {
    primary_color: '',
    button_color: '',
    logo_url: '',
    id: null,
    editButton: false,
    editNav: false,
    editLogo: false,
  };

  componentWillMount = () => {
    this.setState({...this.props})
  }

  buttonChange = (buttonColor) => {
    this.setState({button_color: buttonColor.hex})
    const {button_color, id} = this.state
    const color = {button_color, id}
    const {dispatch} = this.props
    dispatch(updateSettings(color))
  };

  navChange = (navColor) => {
    this.setState({primary_color: navColor.hex})
    const {primary_color, id} = this.state
    const color = {primary_color, id}
    const {dispatch} = this.props
    dispatch(updateSettings(color))
  };

  logoChange = (files) => {
    this.setState({logo_url: files[0]})
  }

  logoSubmit = () => {
    const {logo_url, id} = this.state
    const {dispatch} = this.props
    dispatch(updateLogo(logo_url, id))
  }


  toggleButton = () => {
    this.setState(state => {
      return {editButton: !state.editButton, editNav: false, editLogo: false}
    })
  };

  toggleNav = () => {
    this.setState(state => {
      return {editNav: !state.editNav, editButton: false, editLogo: false}
    })
  };

  toggleLogo = () => {
    this.setState(state => {
      return {editLogo: !state.editLogo, editButton: false, editNav: false}
    })
  };

  render() {
    const {editNav, editButton, editLogo, logo_url} = this.state
    const {navColor, buttonColor, logo} = this.props;
    return (
      <Grid>
        {/* THIS IS FOR EDITING THE COLOR FOR NAV AND BUTTONs */}
        <Grid.Row columns={2}>
          <Grid.Column >
            {editLogo ?
              <Grid>
                <Grid.Row>
                  <Image src={logo} />
                </Grid.Row>
                <Grid.Row>
                  <Form onSubmit={this.logoSubmit}>
                    <Grid.Column width={6}>
                      <Dropzone
                        onDrop={this.logoChange}
                        multiple={false}
                      >
                        {logo_url && <Image src={logo_url.preview} />}
                      </Dropzone>
                    </Grid.Column>
                    <Grid.Column>
                      <Button>Update</Button>
                    </Grid.Column>
                  </Form>
                </Grid.Row>
              </Grid>
              :
              <div></div>
            }
            {editNav ?
              <div>
                <SketchPicker
                  color={navColor}
                  onChangeComplete={this.navChange}
                />
                <Segment>
                  <Wrapper color={navColor}>
                    <h1>Nav Color</h1>
                  </Wrapper>
                </Segment>
              </div>
              :
              <div />
            }
            {editButton ?
              <div>
                <SketchPicker
                  color={buttonColor}
                  onChangeComplete={this.buttonChange}
                />
                <Segment>
                  <Wrapper color={buttonColor}>
                    <h1>Button Color</h1>
                  </Wrapper>
                </Segment>
              </div>
              : <div></div>
            }
          </Grid.Column>
          {/* TOGGLE BUTTONS TO VIEW COLOR PICKER AND PREVIEW */}
          <Grid.Column>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={buttonColor}
                onClick={this.toggleNav}>
                NavBar
              </StyledButton>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={buttonColor}
                onClick={this.toggleButton}>
                Buttons
              </StyledButton>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={buttonColor}
                onClick={this.toggleLogo}>
                Logo
              </StyledButton>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    buttonColor: settings.button_color,
    navColor: settings.primary_color,
    logo: settings.logo_url,
  };
};

const StyledButton = styled(Button) `
background-color: ${ (props) => props.themecolor} !important;
`;
const Wrapper = styled.section`
padding: 4em;
  background: ${(props) => props.color};
`;

export default connect(mapStateToProps)(ColorPicker);
