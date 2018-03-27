import React from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { Segment, Button, Grid, Divider } from 'semantic-ui-react';

class ColorPicker extends React.Component {
  state = {
    editNav: false,
    editButton: false,
    editBackground: false,
  }

  toggleNav = () => {
    this.setState( state => {
      return { editNav: !state.editNav, editButton: false, editBackground: false, }
    } )
  }
  toggleButton = () => {
    this.setState( state => {
      return { editButton: !state.editButton, editNav: false, editBackground: false, }
    } )
  }
  toggleBackground = () => {
    this.setState( state => {
      return { editBackground: !state.editBackground, editNav: false, editButton: false, }
    } )
  }

  navChange = ( navColor ) => {
    const { dispatch } = this.props
    dispatch( { type: 'NAV_COLOR', navColor: navColor.hex } )
  };

  backgroundChange = ( backgroundColor ) => {
    const { dispatch } = this.props
    dispatch( { type: 'BACKGROUND_COLOR', backgroundColor: backgroundColor.hex } )
  };

  buttonChange = ( buttonColor ) => {
    const { dispatch } = this.props
    dispatch( { type: 'BUTTON_COLOR', buttonColor: buttonColor.hex } )
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
              >NavBar</StyledButton>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={ buttonColor }
                onClick={ this.toggleButton }
              >Buttons</StyledButton>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <StyledButton
                themecolor={ buttonColor }
                onClick={ this.toggleBackground }
              >Background</StyledButton>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const StyledButton = styled( Button ) `
  background-color: ${( props ) => props.themecolor } !important;
`
const Wrapper = styled.section`
  padding: 4em;
  background: ${( props ) => props.color };
`;

const mapStateToProps = ( state ) => {
  return { navColor: state.navColor, buttonColor: state.buttonColor, backgroundColor: state.backgroundColor };
};

export default connect( mapStateToProps )( ColorPicker );
