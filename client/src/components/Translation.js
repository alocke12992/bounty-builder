import React from 'react';
import Submissions from './Submissions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Segment, } from 'semantic-ui-react';

class Translation extends React.Component {
  initialState = {
    translation_rules: '',
    translation_link: '',
    }

  state = { ...this.initialState };


  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const { 
      translation_rules, 
      translation_link 
    } = this.props;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
              <Container
                  dangerouslySetInnerHTML={this.createMarkup(
                    translation_link,
                  )}
                />
              </Segment>
              { this.props.user.translator &&
                <Submissions kind={'translation'}/>
              }
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Container
                  dangerouslySetInnerHTML={this.createMarkup(
                    translation_rules,
                  )}
                />
            </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    translation_rules,
    translation_link,
    id,
  } = state.settings
  return { 
    user: state.user,
    translation_rules,
    translation_link,
    id,
  }
}

export default withRouter(connect(mapStateToProps)(Translation));
