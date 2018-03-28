import React from 'react';
import ActionWarning from './ActionWarning';
import axios from 'axios';
import SocialMediaRules from './SocialMediaRules';
import { addReward } from '../actions/rewards';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { withRouter } from 'react-router-dom';
import { Button, Container, Divider, Form, Grid, Header, Icon, Segment, } from 'semantic-ui-react';

class LinkedIn extends React.Component {
  state = { posts: [], value: '', };

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
    axios.get(`/api/posts?kind=reddit`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ posts: res.data });
      });
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    axios.post(`/api/${this.props.service}`, { [`${this.props.service}`]: value } )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch( err => {
        //TODO
      })
  };

  likePage = () => {
    this.props.dispatch(addReward(20, 'reddit', "Subscribed to Deconet on reddit."));
  };

  rewardsIncludes = (reason) => {
    const { rewards } = this.props;
    for (var i = 0; i < rewards.length; i++) {
      if (rewards[i].reason === reason) {
        return true;
      }
    }
    return false;
  };

  renderPosts = () => {
    return this.state.posts.map( post => (
      <Segment key={post.id}>
        <Header as='h3'>Reddit Post:</Header>
        <Button color='orange' as='a' href={post.url} target='_blank'>
          <Icon name='reddit' /> Go to Post
        </Button>
        <Divider hidden />
        <Button
          color='orange'
          disabled={this.rewardsIncludes(`Liked post ${post.id}.`) || this.state.value === ''}
          onClick={() => this.props.dispatch(addReward(20, 'reddit', `Liked post ${post.id}.`, post.id))}
        >
          I liked this post.
        </Button>
      </Segment>
    ))
  };

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    value={value === null ? '' : value}
                    onChange={this.handleChange}
                    required
                    placeholder="Username"
                  />
                  <Form.Button>Save</Form.Button>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <SocialMediaRules/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <ActionWarning />
            <Grid.Column>
            <Segment>
              <Header as='h2'>Subscribe to Deconet Subreddit:</Header>
              <p>Subscribe to Deconet Subreddit. After, come back and press 'I Subscribed'.</p>
              <Button color="orange" as='a' href="https://www.reddit.com/r/Deconet/" target='_blank'>
                <Icon name='reddit'/> Reddit
              </Button>
              <Divider hidden />
              <Button color='orange' onClick={this.likePage} disabled={this.rewardsIncludes("Subscribed to Deconet on reddit.") || this.state.value === ''}>I Subscribed.</Button>
            </Segment>
            { this.renderPosts() }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rewards: state.rewards,
  }
};

export default withRouter(connect(mapStateToProps)(LinkedIn));
