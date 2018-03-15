import React, { Component } from 'react';
import { Header, Segment, List } from 'semantic-ui-react';

class BlogRules extends Component {
  render() {
    return (
      <Segment>
        <p><strong><span style={{fontSize: 16}}>Shares for Blog and Reddit posts:</span></strong></p>
        <p>*Posts must include the statement: &ldquo;I am receiving DCO for growing the community.&rdquo;</p>
        <p><em>250 shares for 100-500 followers</em></p>
        <p><em>500 shares for 501-1000 followers</em></p>
        <p><em>750 shares for 1001-10,000 followers</em></p>
        <p><em>1000 shares for 10,001-50,000 followers</em></p>
        <p><em>2500 shares for 50,001-100,000 followers</em></p>
        <p><em>5000 shares for 100,001+ followers</em></p>
      </Segment>
    );
  }
}

export default BlogRules;
