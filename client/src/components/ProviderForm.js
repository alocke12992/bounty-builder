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

  componentWillMount() {
    this.setState({ ...this.props });
  }

  toggleFacebook = () => {
    this.setState({ facebook: !this.state.facebook })
  }

  toggleTwitter = () => {
    this.setState({ twitter: !this.state.twitter })
  }

  toggleLinkedIn = () => {
    this.setState({ linkedin: !this.state.linkedin })
  }

  toggleReddit = () => {
    this.setState({ reddit: !this.state.reddit })
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const provider = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings( provider ));
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
    } = this.props;
      
    return (
      <Container>
        <Header
          as="h1"
          color="blue"
          textAlign="center">
          Provider
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="blue">
              Social Media
            </Header>
            <ReactQuill
              value={this.state.provider_social_media}
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
              value={this.state.provider_rules}
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
                checked={this.state.facebook === true ? true : false }
                control={Checkbox} 
                label="Facebook"
                onChange={this.toggleFacebook}
              />
              <Form.Field 
                checked={this.state.twitter === true ? true : false }
                control={Checkbox} 
                label="Twitter" 
                onChange={this.toggleTwitter}
              />
              <Form.Field 
                checked={this.state.linkedin === true ? true : false }
                control={Checkbox} 
                label="LinkedIn" 
                onChange={this.toggleLinkedIn}
              />
              <Form.Field 
                checked={this.state.reddit === true ? true : false }
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
    id,
    facebook,
    twitter,
    linkedin,
    reddit,
  } = state.settings
  return {
    provider_social_media,
    provider_rules,
    id,
    facebook,
    twitter,
    linkedin,
    reddit,
  }
}
export default connect(mapStateToProps)(ProviderForm);
