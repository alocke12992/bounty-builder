import React from 'react';
import { Button, Card, Header, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Link } from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';

class Twitter extends React.Component {
  state = { points: 0 }

  componentDidMount() {
    //TODO get twitter points
  }

  render() { 
    const { points } = this.state;
    return (
      <Card>
        <Card.Header>
          <Divider hidden />
          <Header as="h1"textAlign="center">{points}</Header>
          <Header as="h1"textAlign="center">Twitter</Header>
        </Card.Header>
        <Card.Content textAlign="center">
          <p>
            Reward
            {' '}
            <Link to="/point_break_down">Distribution</Link>
          </p>
          <Divider hidden />
          <TwitterLogin
            loginUrl="http://localhost:3001/api/twitter"
            onSuccess={this.showButtons}
            requestTokenUrl="http://localhost:3001/api/twitter/reverse"
          />
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(Twitter);
