import React, { Component } from 'react';
import { Header, Segment, List } from 'semantic-ui-react';

class BlogRules extends Component {
  render() {
    return (
      <Segment>
        <Header as='h2'>Influencer posts, Blog articles and Reddit Posts:</Header>
        <List bulleted>
          <List.Item>
            Everyone can take part by preparing a 400+ words blog post and publishing it online
          </List.Item>
          <List.Item>
            Below is a scale of shares offered per article based off of followers:
          </List.Item>
          <List.Item>
            Engagement Bonus: 2 shares per like/upvote<br/>
            *Articles must contain at least 2 links to: <a href="https://token.simplyvitalhealth.com">https://token.simplyvitalhealth.com</a>
          </List.Item>
          <List.Item>
            <List.Item>
              250 shares for 100-300 followers
            </List.Item>
            <List.Item>
              500 shares for 1000 followers
            </List.Item>
            <List.Item>
              550 shares for 1000+ followers
            </List.Item>
            <List.Item>
              1000 shares for 10,000+ followers
            </List.Item>
            <List.Item>
              2500 shares for 50,000+ followers
            </List.Item>
            <List.Item>
              5000 shares for 100,000
            </List.Item>
          </List.Item>
          <List.Item>
            Rule 1: Low-quality articles will not be accepted
          </List.Item>
          <List.Item>
            Rule 2: Articles must be original work. (You can use official images, logos, graphics posted in website, ANN thread, Facebook, and Twitter).
          </List.Item>
          <List.Item>
            Rule 3: Articles below 400 words will not be accepted.
          </List.Item>
        </List>
      </Segment>
    );
  }
}

export default BlogRules;
