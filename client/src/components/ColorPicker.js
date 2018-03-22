import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Segment, } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {

  state = {
    background: ""
  }

  handleChangeComplete = ( color ) => {
    const { dispatch } = this.props
    dispatch( { type: 'TOGGLE_COLOR', color: color.hex } )
    this.setState( { background: color.hex } )
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
      </div>
    )
  }
}

export default connect()( ColorPicker );