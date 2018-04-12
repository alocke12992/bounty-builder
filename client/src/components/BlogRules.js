import React from 'react';
import { connect } from 'react-redux';
import GenerateHtml from './GenerateHtml';
import { Segment } from 'semantic-ui-react';

class BlogRules extends React.Component {
  render() {
    const { infl_bounties } = this.props;
    return (
      <Segment>
        <GenerateHtml text={infl_bounties} />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    infl_bounties: state.settings.infl_bounties,
  };
};

export default connect(mapStateToProps)(BlogRules);
