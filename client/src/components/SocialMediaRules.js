import React, { Component } from 'react';
import { Header, Segment, List } from 'semantic-ui-react';

class SocialMediaRules extends Component {
  render() {
    return (
      <Segment>
        <Header as='h2'>Social Media: Facebook, Linkedin, or Twitter</Header>
        <List bulleted>
          <List.Item>
            20 shares issued if you Follow/Subscribe/Like SVH on FB, Twitter, Linkedin, and Reddit
          </List.Item>
          <List.Item>
            Rule 1: Accounts must be active and have a Minimum of 200 Followers.
          </List.Item>
          <List.Item>
            Rule 2: Users are limited to 2 posts per day.
          </List.Item>
          <List.Item>
            Rule 3: No shares for robots.
          </List.Item>
        </List>
      </Segment>
    );
  }
}

export default SocialMediaRules;
