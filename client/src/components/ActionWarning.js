import React from 'react';
import GenerateHtml from './GenerateHtml';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class ActionWarning extends React.Component {
  render() {
    const { provider_rules } = this.props;
    return (
      <Container>
        <GenerateHtml text={provider_rules} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    provider_rules: state.settings.provider_rules,
  };
};
export default connect(mapStateToProps)(ActionWarning);
