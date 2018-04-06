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
  Accordion,
  Button,
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Segment,
} from 'semantic-ui-react';

class Twitter extends React.Component {
  state = { posts: [], value: '', activeIndex: 0 };

  componentDidMount() {
    axios
      .get(`/api/${this.props.service}`)
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
    axios.get(`/api/posts?kind=twitter`).then((res) => {
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
    axios
      .post(`/api/${this.props.service}`, {
        [`${this.props.service}`]: value,
      })
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch((err) => {
        this.props.dispatch(setHeaders(err.headers));
      });
  };

  likePage = () => {
    this.props.dispatch(
      addReward(
        20,
        'twitter',
        'Followed Deconet on twitter.',
      ),
    );
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
    return this.state.posts.map((post) => (
      <Card key={post.id}>
        <Card.Content>
          <Tweet
            tweetId={post.url.split('/status/')[1]}
          />
          <Divider hidden />
          <Button
            color="twitter"
            disabled={
              this.rewardsIncludes(
                `Liked post ${post.id}.`,
              ) || this.state.value === ''
            }
            onClick={() =>
              this.props.dispatch(
                addReward(
                  20,
                  'twitter',
                  `Liked post ${post.id}.`,
                  post.id,
                ),
              )
            }>
            I liked this post.
          </Button>
        </Card.Content>
      </Card>
    ));
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { value, activeIndex } = this.state;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Segment>
                <Input
                  fluid
                  label="@"
                  value={value === null ? '' : value}
                  onChange={this.handleChange}
                  required
                  placeholder="Username"
                />
                <Divider fitted hidden />
                <Button
                  onClick={this.handleSubmit}
                  style={styles.saveButton}>
                  Save
                </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <SocialMediaRules />
            </Grid.Column>
            <Grid.Column width={16}>
              <Divider hidden />
              <Segment>
                <Accordion fluid>
                  <Accordion.Content
                    active={activeIndex === 0}>
                    <ActionWarning />
                  </Accordion.Content>
                  <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}>
                    <Icon name="dropdown" />
                    How do I find my username?
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 1}>
                    <Image
                      src={require('../assets/images/twitterexample.jpg')}
                      alt="twitter profile example"
                    />
                  </Accordion.Content>
                </Accordion>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16}>
              <Divider hidden />
              <Segment>
                <Header as="h2">
                  Follow INSERT NAME HERE Twitter Page:
                </Header>
                <p>
                  Follow INSERT NAME HERE on Twitter.
                  After, come back and press 'I followed
                  this page'.
                </p>
                <Divider hidden />
                <Button
                  color="twitter"
                  as="a"
                  href="https://twitter.com/Deco_Network"
                  target="_blank">
                  <Icon name="twitter" /> Twitter
                </Button>
                <Button
                  color="twitter"
                  onClick={this.likePage}
                  disabled={
                    this.rewardsIncludes(
                      'Followed Deconet on twitter.',
                    ) || this.state.value === ''
                  }>
                  I followed this page.
                </Button>
              </Segment>
              <Card.Group>
                {this.renderPosts()}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const styles = {
  saveButton: {
    marginTop: '12px',
  },
};

const mapStateToProps = (state) => {
  return {
    rewards: state.rewards,
  };
};

export default withRouter(
  connect(mapStateToProps)(Twitter),
);
