import React from 'react';
import GenerateHtml from './GenerateHtml'
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class ActionWarning extends React.Component {
 
  render() {
    const { provider_rules } = this.props;
    return (
      <Segment>
        <GenerateHtml text={provider_rules} />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    provider_rules: state.settings.provider_rules,
  };
};
export default connect(mapStateToProps)(ActionWarning);
