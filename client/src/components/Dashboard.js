import React from 'react';
import { Container, Card, Segment, Header } from 'semantic-ui-react';
import PointsTile from './PointsTile';
import TotalUsersTile from './TotalUsersTile';
import TotalSharesTile from './TotalSharesTile';
import Invite from './Invite';
import Wallet from './Wallet';
import ChatRules from './ChatRules';
import Telegram from './Telegram';
import Discord from './Discord';

class Dashboard extends React.Component{
  state = { loading: true }

  render(){
    return(
      <Container>
        <Segment>
          <img
            src={require('../assets/images/logo.svg')}
            style={{height: '75px', width: 'auto'}}
            onClick={() => this.props.history.push('/')}
            alt='HN Token'
          />
          <p>Welcome to the bounty program for Health Nexus, the healthcare-safe blockchain. Find more about our project here: <a href='https://token.simplyvitalhealth.com'>https://token.simplyvitalhealth.com/</a></p>
        </Segment>
        <Card.Group itemsPerRow={2}>
          <TotalUsersTile />
          <TotalSharesTile />
        </Card.Group>
        <Card.Group itemsPerRow={3}>
          <ChatRules/>
          <Telegram/>
          <Discord/>
        </Card.Group>
        <Card.Group itemsPerRow={1}>
          <Wallet />
        </Card.Group>
        <Invite />
        <Segment><Header>Totals</Header></Segment>
        <Card.Group itemsPerRow={3}>
          <PointsTile source="facebook" title="Facebook" />
          <PointsTile source="twitter" title="Twitter" />
          <PointsTile source="linkedin" title="LinkedIn" />
          <PointsTile source="reddit" title="Reddit" />
          <PointsTile source="influencer" title="Influencer" />
          <PointsTile source="telegram" title="Telegram" />
          <PointsTile source="discord" title="Discord" />
          <PointsTile source="invitation" title="Invite" />
          <PointsTile source="translation" title="Translation" />
        </Card.Group>
      </Container>
    )
  }
}

export default Dashboard;
