import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { Button, Card, Divider, Form, Header, Icon } from 'semantic-ui-react';

class Telegram extends React.Component {
  state = { showField: false, username: '', };

  componentDidMount() {
    axios.get('/api/telegram')
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
  };

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = this.state;
    axios.post('/api/telegram', { username } )
      .then( res => {
        this.setState({showField: false});
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Telegram updated', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  render() {
    const { showField, username, } = this.state;
    
    return (
      <Card>
        <Card.Header>
          <Divider hidden />
          <Header as="h1" textAlign="center">Telegram</Header>
        </Card.Header>
        <Card.Content textAlign="center">
          <p>Join the Telegram group below. After, enter the username you joined the group with and then press Submit for Approval. This may only be done once.</p>
          <Divider hidden />
          <Button as='a' color='twitter' href="https://t.me/deco_network" target="_blank">
            <Icon name='telegram' /> Telegram
          </Button>
          <Divider hidden />
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={username}
              onChange={this.handleChange}
              required
              placeholder="Telegram Username"
              disabled={!showField}
            />
          { showField && <Form.Button>Submit for Approval</Form.Button> }
          </Form>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(Telegram);
