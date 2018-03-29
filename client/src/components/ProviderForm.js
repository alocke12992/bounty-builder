import React from 'react';
import ReactQuill from 'react-quill';
import { updateSettings } from '../actions/settings';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class ProviderForm extends React.Component {
  initialState = {
    provider_social_media: '',
    provider_rules: '',
    id: null,
  }

  state = { ...this.initialState };

  componentWillMount() {
    this.setState({ ...this.props });
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
  } = state.settings
  return {
    provider_social_media,
    provider_rules,
    id,  
  }
}
export default connect(mapStateToProps)(ProviderForm);
