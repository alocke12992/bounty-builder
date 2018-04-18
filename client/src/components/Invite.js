import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Segment,
} from 'semantic-ui-react';
import GenerateHtml from './GenerateHtml';

class Invite extends React.Component {

  render() {
    const { dash_invitation_link } = this.props;
    return (
      <Container>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <GenerateHtml text={dash_invitation_link} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invite_code: state.user.outgoing_invite_code,
    dash_invitation_link: state.settings.dash_invitation_link,
  };
};

export default connect(mapStateToProps)(Invite);