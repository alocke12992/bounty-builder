import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Container, Grid, Segment, Header } from 'semantic-ui-react';
import SocialMediaRules from './SocialMediaRules';
import BlogRules from './BlogRules';
import ChatRules from './ChatRules';
import { withRouter } from 'react-router-dom';
import Submissions from './Submissions';

class Social extends React.Component {
  state = { value: '' }

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
  }

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
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Header as='h2'>Submit Your Own Content</Header>
                <p>If you use an influencing platform such as a blog, video site, social media etc, you may submit your own content for shares.</p>
                <ol>
                  <li>Submit your social media account.</li>
                    <ul>
                      <li>If approved you will be contacted via social media.</li>
                      <li>Any posts created without approval will not be rewarded</li>
                    </ul>
                  <li>Create your content.</li>
                  <li>Post a URL to your content (beginning with https)</li>
                  <li>A moderator will review your submission and award shares according to the share rules.</li>
                </ol>
              </Segment>
              <Segment>
                {
                  this.props.user.is_influencer ?
                  <div>
                    <p>You have been approved to submit influencer posts.</p>
                  </div>
                  :
                  <div>
                    <p>Please submit your social media account by using <a href='https://goo.gl/forms/UM8pMKI3XraKqQXv2'>this link</a>.</p>
                    <p>If you are approved to translate, you will be contacted by social media.</p>
                  </div>
                }
              </Segment>
              { this.props.user.is_influencer &&
                <Submissions kind="influencer"/>
              }
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
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(Social));
