import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Header, Container, Grid, Segment, Form, List } from 'semantic-ui-react';
import SocialMediaRules from './SocialMediaRules';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

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
        //TODO
      })
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  fbResponse = (r) => {
    if(r.friends.summary.total_count >= 200){
      r.likes.data.forEach(function (value) {
        if(value.name === "DevPoint Labs"){
          axios.post('/api/rewards', { value: 20, source: 'facebook', reason: 'Liked SVH on Facebook' } )
            .then( res => {
              this.props.dispatch(setHeaders(res.headers));
              this.props.dispatch(setFlash('Completed', 'green'));
            })
            .catch( err => {
              //TODO
            })
        }
      });
    }
  }

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    value={value === null ? '' : value}
                    onChange={this.handleChange}
                    required
                    placeholder="Username"
                  />
                  <Form.Button>Save</Form.Button>
                </Form>
                <hr/>
                <Header as='h2'>How to earn shares:</Header>
                <List bulleted>
                  <List.Item>
                    In order to check for new shares that you are eligible for, you <strong>must</strong> press the login with Facebook button below.
                  </List.Item>
                  <List.Item>
                    You may come back and press the button multiple times, but you will only be awarded according to the share rules.
                  </List.Item>
                </List>
                <FacebookLogin
                  appId="178191166116598"
                  cookie={true}
                  xfbml={true}
                  version='2.8'
                  autoLoad={false}
                  fields="name,email,friends,picture,likes,posts"
                  scope="public_profile,email,user_friends,user_likes,user_posts"
                  callback={this.fbResponse.bind(this)}
                  disableMobileRedirect={true}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <SocialMediaRules/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(connect()(Social));
