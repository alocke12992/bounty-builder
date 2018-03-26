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

class RulesForm extends React.Component {
  state = { main: '', regulations: '' };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  rules = () => {
    const { main, regulations } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          color="teal"
          textAlign="center">
          Rules
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="teal">
              Main Content
            </Header>
            <ReactQuill
              value={this.state.main}
              onChange={(value) =>
                this.handleChange(value, 'main')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="teal">
              Regulations
            </Header>
            <ReactQuill
              value={this.state.regulations}
              onChange={(value) =>
                this.handleChange(value, 'regulations')
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
            {this.rules()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default RulesForm;
