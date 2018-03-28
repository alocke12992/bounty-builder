import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { Button, Card, Header, Form, Divider, Icon, } from 'semantic-ui-react';

class Discord extends React.Component {
  state = { showField: false, username: '', };

  componentDidMount() {
    axios.get('/api/discord')
      .then( res => {
        let showField;
        if (res.data == null){
          showField = true;
        }
        else {
          showField = false;
        }
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ username: res.data ? res.data.username : '', showField });
      });
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = this.state;
    axios.post('/api/discord', { username } )
      .then( res => {
        this.setState({showField: false});
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Discord updated', 'green'));
      })
      .catch( err => {
        //TODO
      })
  }

  render() {
    const { username, showField } = this.state;
    return (
      <Card>
        <Card.Header>
          <Divider hidden />
          <Header as="h1" textAlign="center">Discord</Header>
        </Card.Header>
        <Card.Content textAlign="center">
          <p>Join the Discord group below. After, enter the username you joined the group with and then press Submit for Approval. This may only be done once.</p>
          <Divider hidden />
          <Button as='a' color='twitter' href="https://discordapp.com/invite/2Wfg524" target="_blank">
            <Icon name='chat' /> Discord
          </Button>
          <Divider hidden />
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={username}
              onChange={this.handleChange}
              required
              placeholder="Discord Username"
              disabled={!showField}
            />
          { showField && <Form.Button>Submit for Approval</Form.Button> }
          </Form>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(Discord);
