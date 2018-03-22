import React from 'react';
import ColorPicker from './ColorPicker';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class Settings extends React.Component {
  render() {
    const { backgroundColor } = this.props
    return (
      <div>
        <ColorPicker />
        <Segment>
          <Wrapper color={ backgroundColor } >
            <h1>
              This is in the settings
            </h1>
          </Wrapper>
        </Segment>
      </div>
    )
  }
}

const Wrapper = styled.section`
  padding: 4em;
  background: ${props => props.color };
`;

const mapStateToProps = ( state ) => {
  return { backgroundColor: state.color }
}

export default connect( mapStateToProps )( Settings );