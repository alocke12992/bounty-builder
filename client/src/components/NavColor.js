import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {SketchPicker} from 'react-color';
import {updateSettings} from '../actions/settings'
import {Grid, Segment} from 'semantic-ui-react';

class NavColor extends React.Component {

  navChange = (navColor) => {
    const {dispatch, id} = this.props
    const color = {primary_color: navColor.hex, id}
    dispatch(updateSettings(color))
  };

  render() {
    const {navColor} = this.props;
    return (
      <Grid.Column >
        <SketchPicker
          color={navColor}
          onChangeComplete={this.navChange}
        />
        <Segment>
          <Wrapper color={navColor}>
            <h1>Nav Color Preview</h1>
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
    navColor: settings.primary_color,
  };
};

const Wrapper = styled.section`
padding: 4em;
  background: ${(props) => props.color};
`;

export default connect(mapStateToProps)(NavColor);
