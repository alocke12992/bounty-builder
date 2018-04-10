import React from 'react';
import GenerateHtml from './GenerateHtml';
import Submissions from './Submissions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Grid, Header, Segment, } from 'semantic-ui-react';

class Translation extends React.Component {
  
  render() {
    const { 
      translation_rules,
      is_translator,
      not_translator, 
    } = this.props;
    return (
      <Container>
        <Segment>
          <GenerateHtml text={translation_rules} />
            {
              this.props.user.translator ?
                <div>
                  <GenerateHtml text={is_translator} />
                </div>
              :
                <div>
{/* SUBMISSION BUTTON OR LINK GOES HERE */}
                  <Button color='green' as='a' target="_blank" href="https://goo.gl/forms/Tdqnd3won6vuhz3E3">Submit a Sample Translation</Button>
                  <GenerateHtml text={not_translator} />
                </div>
            }
        </Segment>
          { this.props.user.translator &&
            <Submissions kind={'translation'}/>
          }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    translation_rules,
    is_translator,
    not_translator,
    id,
  } = state.settings
  return { 
    user: state.user,
    is_translator,
    not_translator,
    translation_rules,
    id,
  }
}

export default withRouter(connect(mapStateToProps)(Translation));
