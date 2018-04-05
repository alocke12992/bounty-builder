import React from 'react';
import ReactQuill from 'react-quill';
import { updateSettings } from '../actions/settings';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class ProviderForm extends React.Component {
  state = {
    provider_social_media: '',
    provider_rules: '',
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  toggleFacebook = () => {
    this.setState({ facebook: !this.state.facebook });
  };

  toggleTwitter = () => {
    this.setState({ twitter: !this.state.twitter });
  };

  toggleLinkedIn = () => {
    this.setState({ linkedin: !this.state.linkedin });
  };

  toggleReddit = () => {
    this.setState({ reddit: !this.state.reddit });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const provider = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(provider));
    this.setState({ provider });
  };

  provider = () => {
    const {
      provider_social_media,
      provider_rules,
      facebook,
      twitter,
      linkedin,
      reddit,
    } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Provider
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="blue">
              Social Media
            </Header>
            <ReactQuill
              value={provider_social_media}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'provider_social_media',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Rules
            </Header>
            <ReactQuill
              value={provider_rules}
              onChange={(value) =>
                this.handleChange(value, 'provider_rules')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Segment>
            <Header as="h4" color="blue">
              Check Providers
            </Header>
            <Form.Group inline>
              <Form.Field
                checked={facebook === true}
                control={Checkbox}
                label="Facebook"
                onChange={this.toggleFacebook}
              />
              <Form.Field
                checked={twitter === true}
                control={Checkbox}
                label="Twitter"
                onChange={this.toggleTwitter}
              />
              <Form.Field
                checked={linkedin === true}
                control={Checkbox}
                label="LinkedIn"
                onChange={this.toggleLinkedIn}
              />
              <Form.Field
                checked={reddit === true}
                control={Checkbox}
                label="Reddit"
                onChange={this.toggleReddit}
              />
            </Form.Group>
          </Segment>
          <Divider hidden />
          <Form.Button
            size="normal"
            floated="right"
            color="green">
            Submit All Changes
          </Form.Button>
        </Form>
      </Container>
    );
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            {this.provider()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    provider_social_media,
    provider_rules,
    facebook,
    twitter,
    linkedin,
    reddit,
    id,
  } = state.settings;
  return {
    provider_social_media,
    provider_rules,
    facebook,
    twitter,
    linkedin,
    reddit,
    id,
  };
};
export default connect(mapStateToProps)(ProviderForm);
