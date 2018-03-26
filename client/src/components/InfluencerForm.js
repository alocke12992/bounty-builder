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

class InfluencerForm extends React.Component {
  state = { rules: '', shares: '', link: '' };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  influencer = () => {
    const { rules, shares, link } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          color="olive"
          textAlign="center">
          Influencer
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="olive">
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
            <Header as="h4" color="olive">
              Shares
            </Header>
            <ReactQuill
              value={this.state.shares}
              onChange={(value) =>
                this.handleChange(value, 'shares')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="olive">
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
            {this.influencer()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default InfluencerForm;
