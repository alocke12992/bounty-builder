import React from 'react';
import GenerateHtml from './GenerateHtml';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Welcome extends React.Component {
  initialState = {
    welc_body: '',
    id: null,
  };

  state = { ...this.initialState };

  render() {
    const { welc_body } = this.props;

    return (
      <Container>
        <p>
          <GenerateHtml text={welc_body} />
        </p>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { welc_body, id } = state.settings;
  return {
    user: state.user,
    welc_body,
    id,
  };
};

export default connect(mapStateToProps)(Welcome);
