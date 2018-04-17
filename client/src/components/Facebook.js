import React from 'react';
import ActionWarning from './ActionWarning';
import axios from 'axios';
import FacebookProvider, {
  Like,
  EmbeddedPost,
} from 'react-facebook';
import SocialMediaRules from './SocialMediaRules';
import StyledButton from '../styledcomponents/StyledButton';
import {addReward} from '../actions/rewards';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {setHeaders} from '../actions/headers';
import {withRouter} from 'react-router-dom';
import {
  Accordion,
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

class Facebook extends React.Component {
  state = {posts: [], value: '', activeIndex: 0};

  componentDidMount() {
    axios
      .get(`/api/${this.props.service}`)
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({value: res.data});
      });
    axios.get(`/api/posts?kind=facebook`).then((res) => {
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
        'facebook',
        'Liked Deconet on facebook.',
      ),
    );
  };

  renderPosts = () => {
    return this.state.posts.map((post) => (
      <Segment key={post.id} style={{margin: 10}}>
        <EmbeddedPost href={post.url} width="500" />
        <Divider hidden />
        <Button
          color="facebook"
          disabled={
            this.rewardsIncludes(
              `Liked post ${post.id}.`,
            ) || this.state.value === ''
          }
          onClick={() =>
            this.props.dispatch(
              addReward(
                20,
                'facebook',
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

  rewardsIncludes = (reason) => {
    const {rewards} = this.props;
    for (var i = 0; i < rewards.length; i++) {
      if (rewards[i].reason === reason) {
        return true;
      }
    }
    return false;
  };

  handleClick = (e, titleProps) => {
    const {index} = titleProps;
    const {activeIndex} = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({activeIndex: newIndex});
  };

  render() {
    const {value, activeIndex} = this.state;
    const { facebookLink } = this.props

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
                    placeholder="Add URL Link to Profile"
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
                    How do I find my profile link?
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === 1}>
                    <Image
                      src={require('../assets/images/facebookexample.jpg')}
                      alt="facebook profile example"
                    />
                  </Accordion.Content>
                </Accordion>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16}>
              <Divider hidden />
              <Segment>
                <FacebookProvider appId="178191166116598">
                  <Header as="h2">
                    Follow INSERT NAME HERE Facebook Page:
                  </Header>
                  <Like
                    href={`${facebookLink}`}
                    colorScheme="dark"
                    showFaces
                    width="60"
                  />
                  <Divider hidden />
                  <Button
                    color="facebook"
                    onClick={this.likePage}
                    disabled={
                      this.rewardsIncludes(
                        'Liked Deconet on facebook.',
                      ) || this.state.value === ''
                    }>
                    I liked this page.
                  </Button>
                  {this.renderPosts()}
                </FacebookProvider>
              </Segment>
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
    prov_facebook_link,
  } = state.settings;
  return {
    rewards: state.rewards,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
    facebookLink: prov_facebook_link,
  };
};

export default withRouter(
  connect(mapStateToProps)(Facebook),
);
