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

class LinkedIn extends React.Component {
  state = {posts: [], value: '', activeIndex: 0};

  componentDidMount() {
    axios
      .get(`/api/${this.props.service}`)
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({value: res.data});
      });
    axios.get(`/api/posts?kind=linkedin`).then((res) => {
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
        'linkedin',
        'Followed Deconet on linkedin.',
      ),
    );
  };

  renderPosts = () => {
    return this.state.posts.map((post) => (
      <Segment key={post.id}>
        <Header as="h3">LinkedIn Post:</Header>
        <Button
          color="linkedin"
          as="a"
          href={post.url}
          target="_blank">
          <Icon name="linkedin" /> Go to Post
        </Button>
        <Divider hidden />
        <Button
          color="linkedin"
          disabled={
            this.rewardsIncludes(
              `Liked post ${post.id}.`,
            ) || this.state.value === ''
          }
          onClick={() =>
            this.props.dispatch(
              addReward(
                20,
                'linkedin',
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
    const { linkedInLink } = this.props

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
                      src={require('../assets/images/linkedinexample.jpg')}
                      alt="linkedin profile example"
                    />
                  </Accordion.Content>
                </Accordion>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16}>
              <Divider hidden />
              <Segment>
                <Header as="h2">
                  Follow INSERT NAME HERE LinkedIn Page:
                </Header>
                <p>
                  Follow INSERT NAME HERE on LinkedIn.
                  After, come back and press 'I followed
                  this page'.
                </p>
                <Divider hidden />
                <Button
                  color="linkedin"
                  as="a"
                  href={`${linkedInLink}`}
                  target="_blank">
                  <Icon name="linkedin" /> LinkedIn
                </Button>
                <Button
                  color="linkedin"
                  onClick={this.likePage}
                  disabled={
                    this.rewardsIncludes(
                      'Followed Deconet on linkedin.',
                    ) || this.state.value === ''
                  }>
                  I followed this page.
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
    prov_linkedin_link
  } = state.settings;
  return {
    rewards: state.rewards,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
    linkedInLink: prov_linkedin_link
  };
};

export default withRouter(
  connect(mapStateToProps)(LinkedIn),
);
