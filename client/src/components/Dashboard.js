import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import PointsTile from './PointsTile';
import TotalUsersTile from './TotalUsersTile';
import TotalSharesTile from './TotalSharesTile';

const Dashboard = () => (
  <Container>
    <Card.Group itemsPerRow={3}>
      <PointsTile source="facebook" title="Facebook" />
      <PointsTile source="twitter" title="Twitter" />
      <PointsTile source="linkedin" title="LinkedIn" />
      <PointsTile source="reddit" title="Reddit" />
      <PointsTile source="blog" title="Blog" />
      <PointsTile source="influencer" title="Influencer" />
      <PointsTile source="telegram" title="Telegram" />
      <PointsTile source="discord" title="Discord" />
      <PointsTile source="referral" title="Referral" />
    </Card.Group>
    <Card.Group itemsPerRow={2}>
      <TotalUsersTile />
      <TotalSharesTile />
    </Card.Group>
  </Container>
)

export default Dashboard;
