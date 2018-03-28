import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { Button, Divider, Grid, Segment, } from 'semantic-ui-react';

class ColorPicker extends React.Component {
  state = {
    editBackground: false,
    editButton: false,
    editNav: false,
  };

  backgroundChange = (backgroundColor) => {
    const { dispatch } = this.props
    dispatch({ type: 'BACKGROUND_COLOR', backgroundColor: backgroundColor.hex })
  };

  buttonChange = (buttonColor) => {
    const { dispatch } = this.props
    dispatch({ type: 'BUTTON_COLOR', buttonColor: buttonColor.hex })
  };

  navChange = (navColor) => {
    const { dispatch } = this.props
    dispatch({ type: 'NAV_COLOR', navColor: navColor.hex })
  };

  toggleBackground = () => {
    this.setState( state => {
      return { editBackground: !state.editBackground, editNav: false, editButton: false, }
    } )
  };

  toggleButton = () => {
    this.setState( state => {
      return { editButton: !state.editButton, editNav: false, editBackground: false, }
    } )
  };

  toggleNav = () => {
    this.setState(state => {
      return { editNav: !state.editNav, editButton: false, editBackground: false, }
    })
  };

  render() {
    const { editNav, editButton, editBackground } = this.state
    const { navColor, buttonColor, backgroundColor } = this.props;
    return (
      <Grid>
        <Grid.Row columns={ 2 }>
          <Grid.Column>
            { editNav ?
              <div>
                <SketchPicker
                  color={ navColor }
                  onChangeComplete={ this.navChange }
                />
                <Segment>
                  <Wrapper color={ navColor }>
                    <h1>Nav Color</h1>
                  </Wrapper>
                </Segment>
              </div>
              : <div></div>
            }
            { editButton ?
              <div>
                <SketchPicker
                  color={ buttonColor }
                  onChangeComplete={ this.buttonChange }
                />
                <Segment>
                  <Wrapper color={ buttonColor }>
                    <h1>Button Color</h1>
                  </Wrapper>
                </Segment>
              </div>
              : <div></div>
            }
            { editBackground ?
              <div>
                <SketchPicker
                  color={ backgroundColor }
                  onChangeComplete={ this.backgroundChange }
                />
                <Segment>
                  <Wrapper color={ backgroundColor }>
                    <h1>Background Color</h1>
                  </Wrapper>
                </Segment>
              </div>
              : <div></div>
            }
          </Grid.Column>
          <Grid.Column>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={ buttonColor }
                onClick={ this.toggleNav }
              >
                NavBar
              </StyledButton>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={ buttonColor }
                onClick={ this.toggleButton }
              >
                Buttons
              </StyledButton>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={ buttonColor }
                onClick={ this.toggleBackground }
              >
                Background
              </StyledButton>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { 
    backgroundColor: state.backgroundColor,
    buttonColor: state.buttonColor, 
    navColor: state.navColor, 
  };
};

const StyledButton = styled(Button)`
  background-color: ${( props ) => props.themecolor } !important;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: ${( props ) => props.color };
`;

export default connect( mapStateToProps )( ColorPicker );
