import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { toolbar } from './Settings';
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
    rules_about: '',
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
    dispatch(
      setFlash(
        'Your changes to Rules have been submitted and saved.',
        'blue',
      ),
    );
  };

  rules = () => {
    const { rules_about } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Rules
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="blue">
              About
            </Header>
            <ReactQuill
              value={rules_about}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'rules_about')
              }
            />
            <Divider hidden />
          </Form.Field>

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
              {this.rules()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { rules_about, id } = state.settings;
  return {
    rules_about,
    id,
  };
};

export default connect(mapStateToProps)(RulesForm);
