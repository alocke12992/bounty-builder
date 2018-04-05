import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { toolbar } from './Settings'
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

class RulesForm extends React.Component {
  state = {
    rules_main: '',
    regulations: '',
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const rules = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(rules));
    this.setState({ rules });
  };

  rules = () => {
    const { rules_main, regulations } = this.state;

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
              value={rules_main}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'rules_main')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="teal">
              Regulations
            </Header>
            <ReactQuill
              value={regulations}
              modules={{ toolbar }}
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

const mapStateToProps = (state) => {
  const {
    rules_main,
    regulations,
    id,
  } = state.settings;
  return {
    rules_main,
    regulations,
    id,
  };
};

export default connect(mapStateToProps)(RulesForm);
