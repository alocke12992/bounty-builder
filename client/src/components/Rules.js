import React from 'react';
import GenerateHtml from './GenerateHtml';
import { Container, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Rules extends React.Component {
  initialState = {
    rules_about: '',
    id: null,
  };

  state = { ...this.initialState };

  render() {
    const { rules_about } = this.props;

    return (
      <Container>
        <Segment>
          <GenerateHtml text={rules_about} />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { rules_about, id } = state.settings;
  return {
    user: state.user,
    rules_about,
    id,
  };
};

export default connect(mapStateToProps)(Rules);
