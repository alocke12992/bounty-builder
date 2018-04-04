import React from 'react';
import { Container, Segment, } from 'semantic-ui-react';
import { connect } from 'react-redux'

class Rules extends React.Component {
  initialState= {
    rules_main: '',
    regulations: '',
    id: null,
  }

  state = { ...this.initialState};

  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const {
      rules_main,
      regulation,
    } = this.props;

    return (
      <Container>
        <Segment>
          <Container
              dangerouslySetInnerHTML={this.createMarkup(
                rules_main,
              )}
            />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    rules_main,
    regulations,
    id,
  } = state.settings
  return {
    user: state.user,
    rules_main,
    regulations,
    id,
  }
}

export default connect(mapStateToProps)(Rules);
