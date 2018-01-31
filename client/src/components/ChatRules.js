import React, { Component } from 'react';
import { Header, List, Card } from 'semantic-ui-react';

class ChatRules extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Header as='h2'>Telegram and Discord:</Header>
          <List bulleted>
            <List.Item>
              All users must register to the <a href="https://t.me/HealthNexus">official Telegram Channel Account</a> and to the <a href="https://discordapp.com/invite/2Wfg524">official Discord Channel</a> to be eligible for bounty program.
            </List.Item>
            <List.Item>
              20 Shares to Join the Telegram group & Discord Group (required)
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
}

export default ChatRules;
