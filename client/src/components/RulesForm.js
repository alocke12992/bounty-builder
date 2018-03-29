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

class RulesForm extends React.Component {
  initialState = {
    rules_main: '',
    regulations: '',
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
    const rules = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings( rules ));
    this.setState({ rules });
  };

  rules = () => {
    const { 
      rules_main,
      regulation, 
    } = this.props;
      
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
              value={this.state.rules_main}
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

const mapStateToProps = (state) => {
  const {
    rules_main,
    regulations,
    id,
  } = state.settings
  return {
    rules_main,
    regulations,
    id,
  }
}

export default connect(mapStateToProps)(RulesForm);
