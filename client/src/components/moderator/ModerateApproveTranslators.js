import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Divider, Input, Card, Form } from 'semantic-ui-react';
import axios from 'axios';
import { setHeaders } from '../../actions/headers';
import { setFlash } from '../../actions/flash';

class ModerateApproveTranslators extends Component {
  state = { submissions: [], reward: '' }

  handleChange = (e, id) => {
    this.setState({ [ 'reward' + id]: e.target.value });
  }

  approveTranslator = (email) => {
    axios.post('/api/moderator/add_translator', { email } )
      .then( res => {
        this.setState({email: ''});
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('User has been approved to translate.', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
        this.props.dispatch(setFlash('An error occurred, please make sure the email is correct.', 'red'));
      })
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  }

  render() {
    const { email } = this.state;
    return (
      <Card>
        <Card.Header>
          <Divider hidden />
          <Header as="h1"textAlign="center">Approve User To Be a Translator</Header>
        </Card.Header>
        <Card.Content textAlign="center">
          <Form onSubmit={() => this.approveTranslator(email)}>
            <Form.Input
              value={email}
              onChange={this.handleChange}
              required
              placeholder="User Email"
            />
          <Form.Button>Submit</Form.Button>
          </Form>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(ModerateApproveTranslators);