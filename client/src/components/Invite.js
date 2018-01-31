import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Segment, Header } from 'semantic-ui-react';

class Invite extends React.Component {

  render() {
    return (
      <Container>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Header>
                  Invite Link:
                </Header>
                <p>Use this URL to invite people to join the bounty program.</p>
                <p>When someone joins using your invite code, both parties will receive 50 shares.</p>
                <a href={'https://bountyhealthnexus.herokuapp.com/register?invite_code=' + this.props.invite_code }>{'https://bountyhealthnexus.herokuapp.com/register?invite_code=' + this.props.invite_code }</a>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    invite_code: state.user.outgoing_invite_code
  }
}
export default connect(mapStateToProps)(Invite);
