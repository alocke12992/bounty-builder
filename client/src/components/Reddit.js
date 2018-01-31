import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Header, Container, Grid, Segment, Form, Button, Divider, Icon } from 'semantic-ui-react';
import SocialMediaRules from './SocialMediaRules';
import { withRouter } from 'react-router-dom';
import { addReward } from '../actions/rewards';
import ActionWarning from './ActionWarning';

class LinkedIn extends React.Component {
  state = { value: '', posts: [] }

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
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

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
  }

  likePage = () => {
    this.props.dispatch(addReward(20, 'reddit', "Subscribed to SVH on reddit."));
  }

  rewardsIncludes = (reason) => {
    const { rewards } = this.props;
    for (var i=0; i < rewards.length; i++) {
      if (rewards[i].reason === reason) {
        return true;
      }
    }
    return false;
  }

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
                {/*<hr/>
                <Header as='h2'>How to earn shares:</Header>
                <List bulleted>
                  <List.Item>
                    In order to check for new shares that you are eligible for, you <strong>must</strong> press the login with Facebook button below.
                  </List.Item>
                  <List.Item>
                    You may come back and press the button multiple times, but you will only be awarded according to the share rules.
                  </List.Item>
                </List>
                <FacebookLogin
                  appId="355565764911095"
                  cookie={true}
                  xfbml={true}
                  version='2.8'
                  autoLoad={false}
                  fields="name,email,friends,picture,likes,posts"
                  scope="public_profile,email,user_friends,user_likes,user_posts"
                  callback={this.fbResponse.bind(this)}
                  disableMobileRedirect={true}
                />*/}
              </Segment>
              {/*// <Submissions kind={this.props.service}/>*/}
            </Grid.Column>
            <Grid.Column>
              <SocialMediaRules/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <ActionWarning />
            <Grid.Column>
            <Segment>
              <Header as='h2'>Subscribe to SVH Subreddit:</Header>
              <p>Subscribe to SVH Subreddit. After, come back and press 'I Subscribed'.</p>
              <Button color="orange" as='a' href="https://www.reddit.com/r/SimplyVitalHealth/" target='_blank'>
                <Icon name='reddit'/> Reddit
              </Button>
              <Divider hidden />
              <Button color='orange' onClick={this.likePage} disabled={this.rewardsIncludes("Subscribed to SVH on reddit.") || this.state.value === ''}>I Subscribed.</Button>
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
}

export default withRouter(connect(mapStateToProps)(LinkedIn));
