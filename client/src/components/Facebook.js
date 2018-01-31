import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Header, Container, Grid, Segment, Form, Button, Divider } from 'semantic-ui-react';
import SocialMediaRules from './SocialMediaRules';
import { withRouter } from 'react-router-dom';
import FacebookProvider, { Like, EmbeddedPost } from 'react-facebook';
import { addReward } from '../actions/rewards';
import ActionWarning from './ActionWarning';

class Facebook extends React.Component {
  state = { value: '', posts: [] }

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
    axios.get(`/api/posts?kind=facebook`)
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
      <Segment key={post.id} style={{margin: 10}}>
        <EmbeddedPost href={post.url} width="500" />
        <Divider hidden />
        <Button
          color='facebook'
          disabled={this.rewardsIncludes(`Liked post ${post.id}.`) || this.state.value === ''}
          onClick={() => this.props.dispatch(addReward(20, 'facebook', `Liked post ${post.id}.`, post.id))}
        >
          I liked this post.
        </Button>
      </Segment>
    ))
  }

  likePage = () => {
    this.props.dispatch(addReward(20, 'facebook', 'Liked SVH on facebook.'));
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
            <ActionWarning/>
              <FacebookProvider appId="178191166116598">
                <Segment>
                  <Header as='h2'>Simply Vital Health Facebook Page:</Header>
                  <Like href="https://www.facebook.com/SimplyVitalHealth/" colorScheme="dark" showFaces />
                  <Divider hidden />
                  <Button color='facebook' onClick={this.likePage} disabled={this.rewardsIncludes("Liked SVH on facebook.") || this.state.value === ''}>I liked this page.</Button>
                </Segment>
                { this.renderPosts() }
              </FacebookProvider>
          </Grid.Row>
          <Grid.Row>


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

export default withRouter(connect(mapStateToProps)(Facebook));
