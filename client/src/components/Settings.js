import React from 'react';
import ColorPicker from './ColorPicker'
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <ColorPicker />
      </div>
    )
  }
}



export default connect()( Settings );