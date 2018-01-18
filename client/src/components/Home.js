import React, { Component } from 'react';
import { Segment, Divider, Header, Image, Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../images/robomed-logo.png';
import Actions from './Actions';

class Home extends Component {
  state = { icoEnd: '2/13/18' }

  render() {
    const { icoEnd } = this.state;
    return (
      <div>
        <Container>
          <Divider hidden />
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Image 
                  src={logo} 
                  alt="logo" 
                  size="small" 
                  verticalAlign="middle"
                  centered
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h1">ICO Ends:</Header>
                <Header as="h1">{icoEnd}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={6}> 
              <Segment.Group>
                <Segment color="orange">
                  Dashboard
                </Segment>
                <Segment.Group>
                  <Link to="blog_post">
                    <Segment>Write Blog Post</Segment>
                  </Link>
                  <Link to="translate">
                    <Segment>Translate</Segment>
                  </Link>
                  <Link to="email_refferal">
                    <Segment>Email Referral</Segment>
                  </Link>
                </Segment.Group>
              </Segment.Group>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={10}> 
              <Segment.Group>
                <Segment color="orange">Provile Overview (Updated every 48 hours)</Segment>
                <Actions />
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
