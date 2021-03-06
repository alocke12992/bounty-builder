import React from 'react';
import ActionWarning from './ActionWarning';
import axios from 'axios';
import SocialMediaRules from './SocialMediaRules';
import StyledButton from '../styledcomponents/StyledButton';
import {addReward} from '../actions/rewards';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {setHeaders} from '../actions/headers';
import {withRouter} from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

class LinkedIn extends React.Component {
  state = {posts: [], value: ''};

  componentDidMount() {
    axios.get(`/api/${this.props.service}`).then((res) => {
      this.props.dispatch(setHeaders(res.headers));
      this.setState({value: res.data});
    });
    axios.get(`/api/posts?kind=reddit`).then((res) => {
      this.props.dispatch(setHeaders(res.headers));
      this.setState({posts: res.data});
    });
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {value} = this.state;
    axios
      .post(`/api/${this.props.service}`, {
        [`${this.props.service}`]: value,
      })
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch((err) => {
        //TODO
      });
  };

  likePage = () => {
    this.props.dispatch(
      addReward(
        20,
        'reddit',
        'Subscribed to Deconet on reddit.',
      ),
    );
  };

  rewardsIncludes = (reason) => {
    const {rewards} = this.props;
    for (var i = 0; i < rewards.length; i++) {
      if (rewards[i].reason === reason) {
        return true;
      }
    }
    return false;
  };

  renderPosts = () => {
    return this.state.posts.map((post) => (
      <Segment key={post.id}>
        <Header as="h3">Reddit Post:</Header>
        <Button
          color="orange"
          as="a"
          href={post.url}
          target="_blank">
          <Icon name="reddit" /> Go to Post
        </Button>
        <Divider hidden />
        <Button
          color="orange"
          disabled={
            this.rewardsIncludes(
              `Liked post ${post.id}.`,
            ) || this.state.value === ''
          }
          onClick={() =>
            this.props.dispatch(
              addReward(
                20,
                'reddit',
                `Liked post ${post.id}.`,
                post.id,
              ),
            )
          }>
          I liked this post.
        </Button>
      </Segment>
    ));
  };

  render() {
    const {value} = this.state;
    const { redditLink } = this.props

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
                  <StyledButton
                    backgroundColor={this.props.buttonColor}
                    fontColor={this.props.fontColor}
                    border={this.props.borderColor}
                  >
                    Save
                  </StyledButton>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <SocialMediaRules />
            </Grid.Column>
            <Grid.Column width={16}>
              <Divider hidden />
              <Segment>
                <ActionWarning />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16}>
              <Divider hidden />
              <Segment>
                <Header as="h2">
                  Subscribe to INSERT NAME HERE Subreddit:
                </Header>
                <p>
                  Subscribe to INSERT NAME HERE Subreddit.
                  After, come back and press 'I Subscribed'.
                </p>
                <Divider hidden />
                <Button
                  color="orange"
                  as="a"
                  href={`${redditLink}`}
                  target="_blank">
                  <Icon name="reddit" /> Reddit
                </Button>
                <Button
                  color="orange"
                  onClick={this.likePage}
                  disabled={
                    this.rewardsIncludes(
                      'Subscribed to Deconet on reddit.',
                    ) || this.state.value === ''
                  }>
                  I Subscribed.
                </Button>
              </Segment>
              {this.renderPosts()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
    prov_reddit_link,
  } = state.settings;
  return {
    rewards: state.rewards,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
    redditLink: prov_reddit_link,
  };
};

export default withRouter(connect(mapStateToProps)(LinkedIn));
