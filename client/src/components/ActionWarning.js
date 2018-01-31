import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class ActionWarning extends Component {
  render() {
    return (
      <Segment as='h1' textAlign='center'>
        <p><strong>Important,</strong> by pressing an action button such as 'I Subscribed' or 'I liked this post' you must be certain that you actually did like the post, follow a page etc.</p>
        <p>In the username field above, you MUST enter EXACTLY the name that appears under the like section of a facebook, twitter linkedin post etc.</p>
        <p>Moderators are actively reviewing bounty claims. Anyone found with an ingenuine bounty claim will be <strong>removed</strong> from the program with their shares <strong>revoked.</strong></p>
      </Segment>
    );
  }
}

export default ActionWarning;
