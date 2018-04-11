import React from 'react';
import GenerateHtml from './GenerateHtml';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class ActionWarning extends React.Component {
  render() {
    const { prov_action_warning } = this.props;
    return (
      <Container>
        <GenerateHtml text={prov_action_warning} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prov_action_warning: state.settings.prov_action_warning,
  };
};
export default connect(mapStateToProps)(ActionWarning);
