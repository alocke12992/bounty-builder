import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class SocialMediaRules extends React.Component {
  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const { provider_social_media } = this.props;

    return (
      <Segment
        dangerouslySetInnerHTML={this.createMarkup(
          provider_social_media,
        )}
      />
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
