import React from 'react';
import { baseURL } from '../utils/urls';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class Invite extends React.Component {
  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const { invitation_link } = this.props;
    return (
      <Container>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Container
                  dangerouslySetInnerHTML={this.createMarkup(
                    invitation_link,
                  )}
                />
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
    invitation_link: state.settings.invitation_link,
  };
};

export default connect(mapStateToProps)(Invite);
