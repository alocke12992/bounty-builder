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

class TranslationForm extends React.Component {
  state = { link: '', rules: '', };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  translation = () => {
    const { rules, link } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          color="orange"
          textAlign="center">
          Translation
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="orange">
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
          <Form.Field>
            <Header as="h4" color="orange">
              Link
            </Header>
            <ReactQuill
              value={this.state.link}
              onChange={(value) =>
                this.handleChange(value, 'link')
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
            {this.translation()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TranslationForm;
