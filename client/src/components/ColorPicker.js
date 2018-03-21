import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { Segment, } from 'semantic-ui-react';

class ColorPicker extends React.Component {

  state = {
    background: ""
  }

  handleChangeComplete = ( color ) => {
    const { dispatch } = this.props
    const { background } = this.state
    dispatch( { type: 'TOGGLE_COLOR', color: background } )
    this.setState( { background: color.hex } );
  };

  render() {
    const { background } = this.state
    return (
      <div>
        <Segment>
          <SketchPicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        </Segment>
        <Segment>
          <Wrapper color={ background } >
            <Title>
              Hello World
            </Title>
          </Wrapper>
        </Segment>
      </div>
    )
  }
}
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: ${props => props.color };
`;

const mapStateToProps = ( state ) => {
  return { color: state.color }
}

export default connect( mapStateToProps )( ColorPicker );