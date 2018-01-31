import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Submissions from './Submissions';

class Translation extends React.Component {

  render() {
    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <p><strong>Bounty: </strong> 500 shares for a translation of this document into Spanish.</p>
                <p>This bounty will only be awarded to one person.</p>
                <a href="https://docsend.com/view/cuufmc5">Health Nexus Document</a>
                <p>Submit a link to your translation below.</p>
              </Segment>
              <Submissions kind={'translation'}/>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h2'>Translation Services</Header>
                <p><strong>Rule 1: </strong>The use of google translator or similar is not allowed. Participants using google translator will not be accepted.</p>
                <ul>
                  <li>500 shares per translation of white paper or [ANN] Thread Need to be able to submit translations through the account</li>
                </ul>
                <p><strong>Rules and Terms:</strong><br /><br />1: Translations must be original, using any kind of tools such as Google are not allowed. If found the translator will be blacklisted.<br />2: ANN thread translator will be responsible for the moderation as well (we have additional rewards for moderation). The translator must keep the thread active by translation of official announcements, news, posts. <br />3: We do not need any Single Post Dead Thread. If you failed to keep the thread active and up to date, your reward can be reduced to 50% of the actual payment.<br /> 4: Increasing the moderation post count by spam posts, posting false posts or paying other to ask questions in your thread is not allowed. <br />5. Simply Vital reserves the rights to add rules, or make any kind reasonable changes.</p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(connect()(Translation));
