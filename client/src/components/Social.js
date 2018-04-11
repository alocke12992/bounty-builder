import React from 'react';
import axios from 'axios';
import BlogRules from './BlogRules';
import ChatRules from './ChatRules';
import GenerateHtml from './GenerateHtml';
import SocialMediaRules from './SocialMediaRules';
import Submissions from './Submissions';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Segment, } from 'semantic-ui-react';

class Social extends React.Component {
  initialState = {
    infl_submission: '',
    infl_bounties: '',
    infl_link: '',
    id: null,
  }

  state = { ...this.initialState };

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    axios.post(`/api/${this.props.service}`, { [`${this.props.service}`]: value } )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  render() {
    const { 
      infl_submission,
      infl_bounties, 
      infl_link,
    } = this.props;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
               <GenerateHtml text={infl_submission} />
              </Segment>
              <Segment>
                <GenerateHtml text={infl_bounties} />
              </Segment>
              <Segment>
                 <GenerateHtml text={infl_link} />
                </Segment>
            </Grid.Column>
            <Grid.Column>
              <BlogRules />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    infl_submission,
    infl_bounties,
    infl_link,
    id,
  } = state.settings

  return {
    infl_submission,
    infl_bounties,
    infl_link,
  }
};

export default withRouter(connect(mapStateToProps)(Social));
