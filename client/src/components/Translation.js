import React from 'react';
import GenerateHtml from './GenerateHtml';
import StyledButton from '../styledcomponents/StyledButton';
import Submissions from './Submissions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class Translation extends React.Component {
  initialState = {
    trans_rules: '',
    trans_link: '',
  };

  state = { ...this.initialState };

  render() {
    const { trans_rules, trans_link } = this.props;
    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <GenerateHtml text={trans_rules} />
              </Segment>
              {this.props.user.translator && (
                <Submissions kind={'translation'} />
              )}
            </Grid.Column>
            <Grid.Column width={16}>
              <Divider hidden />
              <Segment>
                <StyledButton
                  backgroundColor={this.props.buttonColor}
                  fontColor={this.props.fontColor}
                  border={this.props.borderColor}
                  target="_blank"
                  href={`${trans_link}`}
                >
                  Submit for Approval
                </StyledButton>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    trans_rules, 
    trans_link, 
    id,
    buttonColor,
    fontColor,
    borderColor, 
  } = state.settings;
  return {
    user: state.user,
    trans_rules,
    trans_link,
    id,
    buttonColor,
    fontColor,
    borderColor,
  };
};

export default withRouter(
  connect(mapStateToProps)(Translation),
);
