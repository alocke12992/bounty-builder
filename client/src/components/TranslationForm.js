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

class TranslationForm extends React.Component {
  initialState = {
    translation_rules: '',
    translation_link: '',
    id: null,
  }

  state = { ...this.initialState };

  componentWillMount(){
    this.setState({ ...this.props });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const translation = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings( translation ));
    this.setState({ translation });
  };

  translation = () => {
    const { 
      translation_rules, 
      translation_link 
    } = this.props;

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
              value={this.state.translation_rules}
              onChange={(value) =>
                this.handleChange(value, 'translation_rules')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="orange">
              Link
            </Header>
            <ReactQuill
              value={this.state.translation_link}
              onChange={(value) =>
                this.handleChange(value, 'translation_link')
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

const mapStateToProps = (state) => {
  const {
    translation_rules,
    translation_link,
    id,
  } = state.settings
  return {
    translation_rules,
    translation_link,
    id,
  }

}


export default connect(mapStateToProps)(TranslationForm);
