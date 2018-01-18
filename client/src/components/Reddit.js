import React from 'react';
import { Card, Header, Input } from 'semantic-ui-react';

class Wallet extends React.Component {
  state = { points: 0 }

  render() { 
    const { points } = this.state;
    return (
      <Card>
        <Card.Header>
          <Header>{points}</Header>
          <Header>Ethereum</Header>
        </Card.Header>
        <Card.Content>
        </Card.Content>
      </Card>
    )
  }
}

export default Wallet;
