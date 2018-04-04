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
import { Container, Grid, Header, Segment, } from 'semantic-ui-react';

class Social extends React.Component {
  state = { value: '' };

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
    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
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
};

export default withRouter(connect(mapStateToProps)(Social));
