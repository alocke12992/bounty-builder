import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../../actions/flash';
import { setHeaders } from '../../actions/headers';
import { Button, Card, Divider, Form, Header, Input, } from 'semantic-ui-react';

class ModerateApproveInfluencers extends React.Component {
  state = { reward: '', submissions: [] }

  approveInfluencer = (email) => {
    axios.post('/api/moderator/add_influencer', { email } )
      .then( res => {
        this.setState({email: ''});
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('User has been approved as an influencer.', 'green'));
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
      <Card fluid>
        <Card.Content textAlign="center">
          <Card.Header>
            <Header as="h1" textAlign="center">Approve User To Be An Influencer</Header>
            <Divider />
          </Card.Header>
          <Form onSubmit={() => this.approveInfluencer(email)}>
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

export default connect()(ModerateApproveInfluencers);
