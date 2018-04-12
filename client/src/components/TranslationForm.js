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

class TranslationForm extends React.Component {
  state = {
    trans_rules: '',
    trans_link: '',
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const translation = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(translation));
    dispatch(
      setFlash(
        'Your changes to the Translation have been submitted and saved.',
        'blue',
      ),
    );
  };

  translation = () => {
    const { trans_rules, trans_link } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Translation
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="blue">
              Rules
            </Header>
            <ReactQuill
              value={trans_rules}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'trans_rules')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Link
            </Header>
            <ReactQuill
              value={trans_link}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'trans_link')
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
              {this.translation()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { trans_rules, trans_link, id } = state.settings;
  return {
    trans_rules,
    trans_link,
    id,
  };
};

export default connect(mapStateToProps)(TranslationForm);
