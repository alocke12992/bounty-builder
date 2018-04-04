import React from 'react';
import axios from 'axios';
import BlogRules from './BlogRules';
import ChatRules from './ChatRules';
import SocialMediaRules from './SocialMediaRules';
import Submissions from './Submissions';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { withRouter } from 'react-router-dom';
import { Button, Container, Grid, Header, Segment, } from 'semantic-ui-react';

class VideoContest extends React.Component {
  state = { value: '' };

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then(res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    axios.post(`/api/${this.props.service}`, { [`${this.props.service}`]: value })
      .then(res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  render() {
    return (
      <Container>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <div>
                  <Container
                    dangerouslySetInnerHTML={this.createMarkup(
                      this.props.settings.video_contest
                    )}
                  />
                  <p>&nbsp;</p>
                  <p style={{ lineHeight: '1.56', marginTop: '10pt', marginBottom: '0pt' }}><span style={{ fontFamily: 'arial, helvetica, sans-serif', color: '#000000' }}><strong><span style={{ fontSize: '11pt', backgroundColor: 'transparent', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap' }}>*Participants are responsible for knowing the participation rules in their countries and cannot participate if entry is prohibited.*</span></strong></span></p>
                </div>
                <Button fluid color='green' href='https://goo.gl/forms/Ah5NiLdYASwbzt4d2'>Enter Video Contest</Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
};

const mapStateToProps = (state) => {
  return { 
    settings: state.settings,
    user: state.user,
  }
};

export default withRouter(connect(mapStateToProps)(VideoContest));
