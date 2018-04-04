import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class ActionWarning extends React.Component {
  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const { provider_rules } = this.props;

    return (
      <Segment
        dangerouslySetInnerHTML={this.createMarkup(
          provider_rules,
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    provider_rules: state.settings.provider_rules,
  };
};
export default connect(mapStateToProps)(ActionWarning);
