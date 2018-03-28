import React from 'react';
import ReactQuill from 'react-quill';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class ProviderForm extends React.Component {
  state = { rules: '', social_media: '', };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  provider = () => {
    const { social_media, rules } = this.state;
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
              value={this.state.social_media}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'social_media',
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
              value={this.state.rules}
              onChange={(value) =>
                this.handleChange(value, 'rules')
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

export default ProviderForm;
