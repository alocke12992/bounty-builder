import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Segment, Container } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
  state = {
    background: '',
  };

  handleChangeComplete = (color) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'TOGGLE_COLOR',
      color: color.hex,
    });
    this.setState({ background: color.hex });
  };

  render() {
    const { background } = this.state;
    const { backgroundColor } = this.props;
    return (
      <Container>
        <Segment>
          <SketchPicker
            color={background}
            onChangeComplete={
              this.handleChangeComplete
            }
          />
        </Segment>
        <Segment>
          <Wrapper color={backgroundColor}>
            <h1>COLORFUL COCKATRICE CHOICER</h1>
          </Wrapper>
        </Segment>
      </Container>
    );
  }
}
const Wrapper = styled.section`
  padding: 4em;
  background: ${(props) => props.color};
`;

const mapStateToProps = (state) => {
  return { backgroundColor: state.color };
};

export default connect(mapStateToProps)(ColorPicker);
