import React from 'react';
import GenerateHtml from './GenerateHtml';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class SocialMediaRules extends React.Component {
  render() {
    const { provider_social_media } = this.props;

    return (
      <Segment>
       <GenerateHtml text={provider_social_media} />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    provider_social_media:
      state.settings.provider_social_media,
  };
};

export default connect(mapStateToProps)(SocialMediaRules);
