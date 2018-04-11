import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {SketchPicker} from 'react-color';
import {updateSettings} from '../actions/settings'
import {Grid, Segment} from 'semantic-ui-react';

class ButtonColor extends React.Component {

  buttonChange = (buttonColor) => {
    const {dispatch, id} = this.props
    const color = {theme_button_color: buttonColor.hex, id}
    dispatch(updateSettings(color))
  };

  render() {
    const {buttonColor} = this.props;
    return (
      <Grid.Column >
        <SketchPicker
          color={buttonColor}
          onChangeComplete={this.buttonChange}
        />
        <Segment>
          <Wrapper color={buttonColor}>
            <h1>Button Color Preview</h1>
          </Wrapper>
        </Segment>
      </Grid.Column>
    );
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    buttonColor: settings.theme_button_color,
  };
};

const Wrapper = styled.section`
padding: 4em;
  background: ${(props) => props.color};
`;

export default connect(mapStateToProps)(ButtonColor);