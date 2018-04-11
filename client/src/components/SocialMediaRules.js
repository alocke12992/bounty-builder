import React from 'react';
import GenerateHtml from './GenerateHtml';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class SocialMediaRules extends React.Component {
  render() {
    const { prov_social_media } = this.props;

    return (
      <Segment>
       <GenerateHtml text={prov_social_media} />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prov_social_media:
      state.settings.prov_social_media,
  };
};

export default connect(mapStateToProps)(SocialMediaRules);
