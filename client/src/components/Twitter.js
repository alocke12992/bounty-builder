import React from 'react';
import ActionWarning from './ActionWarning';
import axios from 'axios';
import SocialMediaRules from './SocialMediaRules';
import { addReward } from '../actions/rewards';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { Tweet } from 'react-twitter-widgets';
import { withRouter } from 'react-router-dom';
import { 
  Button, 
  Card,
  Container, 
  Divider, 
  Form, 
  Grid, 
  Header, 
  Icon, 
  Segment, 
} from 'semantic-ui-react';

class Twitter extends React.Component {
  state = { posts: [], value: '', };

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
    axios.get(`/api/posts?kind=twitter`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ posts: res.data });
      });
  };

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
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  likePage = () => {
    this.props.dispatch(addReward(20, 'twitter', 'Followed Deconet on twitter.'));
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
      <Card key={post.id}>
        <Card.Content>
          <Tweet tweetId={post.url.split('/status/')[1]} />
          <Divider hidden />
          <Button
            color='twitter'
            disabled={this.rewardsIncludes(`Liked post ${post.id}.`) || this.state.value === ''}
            onClick={() => this.props.dispatch(addReward(20, 'twitter', `Liked post ${post.id}.`, post.id))}
          >
            I liked this post.
          </Button>
        </Card.Content>
      </Card>
    ))
  };

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column width={8}>
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
            <Grid.Column width={8}>
              <SocialMediaRules/>
            </Grid.Column>
            <Grid.Column width={16}>
              <Divider hidden />
              <ActionWarning />
            </Grid.Column>
            <Grid.Column mobile={16}>
              <Divider hidden />
              <Segment>
                <Header as='h2'>Follow Simply Vital Health Twitter Page:</Header>
                  <p>Follow Deconet on Twitter. After, come back and press 'I followed this page'.</p>
                <Button color="twitter" as='a' href="https://twitter.com/Deco_Network" target='_blank'>
                  <Icon name='twitter'/> Twitter
                </Button>
                <Divider hidden />
                <Button color='twitter' onClick={this.likePage} disabled={this.rewardsIncludes("Followed Deconet on twitter.") || this.state.value === ''}>I followed this page.</Button>
              </Segment>
              <Card.Group>
                { this.renderPosts() }
              </Card.Group>
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

export default withRouter(connect(mapStateToProps)(Twitter));
