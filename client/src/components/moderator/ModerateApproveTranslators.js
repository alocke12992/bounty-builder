import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../../actions/flash';
import { setHeaders } from '../../actions/headers';
import { Card, Divider, Form, Header } from 'semantic-ui-react';

class ModerateApproveTranslators extends React.Component {
  state = { reward: '', submissions: [], }

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
  };

  // TODO: Duplicate?
  handleChange = (e, id) => {
    this.setState({ [ 'reward' + id]: e.target.value });
  };

  // TODO: Duplicate?
  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { email } = this.state;
    return (
      <Card fluid>
        <Card.Content textAlign="center">
          <Card.Header>
            <Header as="h1"textAlign="center">Approve User To Be a Translator</Header>
            <Divider />
          </Card.Header>
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
