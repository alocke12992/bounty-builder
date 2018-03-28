import React from 'react';
import Submissions from './Submissions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Segment, } from 'semantic-ui-react';

class Translation extends React.Component {

  render() {
    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                {
                  this.props.user.translator ?
                  <div>
                    <p>You have been approved to submit translations.</p>
                  </div>
                  :
                  <div>
                    <p>Please submit a sample translation using <a href='https://goo.gl/forms/Tdqnd3won6vuhz3E3'>this link</a>.</p>
                    <p>If you are approved to translate, you will be contacted by email.</p>
                  </div>
                }
              </Segment>
              { this.props.user.translator &&
                <Submissions kind={'translation'}/>
              }
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h2'>Translation Services</Header>
                <p>***The use of google translator or similar is not allowed. Participants using google translator will not be accepted.</p>
                <p>&nbsp;</p>
                <ul>
                  <li>Reward starts at 1000 shares per translation of white paper and may be increased based on quality of translation.</li>
                </ul>
                <p>&nbsp;</p>
                <ul>
                  <li>Users in the bounty program can reserve translation by submitting a link to a sample translation and an email.</li>
                </ul>
                <p>&nbsp;</p>
                <ul>
                  <li>User will be able to see whether translations have been accepted from the Translation tab.</li>
                </ul>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(Translation));
