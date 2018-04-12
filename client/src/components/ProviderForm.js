import React from 'react';
import ReactQuill from 'react-quill';
import { setFlash } from '../actions/flash';
import { toolbar } from './Settings';
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
    prov_social_media: '',
    prov_action_warning: '',
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  toggleFacebook = () => {
    this.setState({ prov_facebook: !this.state.prov_facebook });
  };

  toggleTwitter = () => {
    this.setState({ prov_twitter: !this.state.prov_twitter });
  };

  toggleLinkedIn = () => {
    this.setState({ prov_linkedin: !this.state.prov_linkedin });
  };

  toggleReddit = () => {
    this.setState({ prov_reddit: !this.state.prov_reddit });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const provider = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(provider));
    dispatch(
      setFlash(
        'Your changes to Provider have been submitted and saved.',
        'blue',
      ),
    );
  };

  provider = () => {
    const {
      prov_social_media,
      prov_action_warning,
      prov_facebook,
      prov_twitter,
      prov_linkedin,
      prov_reddit,
    } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Provider
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            Enable Providers
          </Header>
          <Form.Group inline>
            <Form.Field
              checked={prov_facebook === true}
              control={Checkbox}
              label="Facebook"
              onChange={this.toggleFacebook}
            />
            <Form.Field
              checked={prov_twitter === true}
              control={Checkbox}
              label="Twitter"
              onChange={this.toggleTwitter}
            />
            <Form.Field
              checked={prov_linkedin === true}
              control={Checkbox}
              label="LinkedIn"
              onChange={this.toggleLinkedIn}
            />
            <Form.Field
              checked={prov_reddit === true}
              control={Checkbox}
              label="Reddit"
              onChange={this.toggleReddit}
            />
          </Form.Group>
          <Divider />
          <Form.Field>
            <Header as="h4" color="blue">
              Social Media
            </Header>
            <ReactQuill
              value={prov_social_media}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'prov_social_media',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Action Warning
            </Header>
            <ReactQuill
              value={prov_action_warning}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'prov_action_warning')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Divider hidden />
          <Form.Button
            size="normal"
            floated="right"
            color="blue">
            Submit All Changes
          </Form.Button>
        </Form>
      </Container>
    );
  };

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.provider()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    prov_social_media,
    prov_action_warning,
    prov_facebook,
    prov_twitter,
    prov_linkedin,
    prov_reddit,
    id,
  } = state.settings;
  return {
    prov_social_media,
    prov_action_warning,
    prov_facebook,
    prov_twitter,
    prov_linkedin,
    prov_reddit,
    id,
  };
};
export default connect(mapStateToProps)(ProviderForm);
