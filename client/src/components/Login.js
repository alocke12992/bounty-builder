import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { baseURL } from '../utils/urls';
import { handleLogin } from '../actions/auth';
import { Link } from 'react-router-dom';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Button, Form, Grid, Image, Segment, } from 'semantic-ui-react';
const queryString = require('query-string');
// var ClientOAuth2 = require('client-oauth2');
//
// var deconetAuth = new ClientOAuth2({
//   clientId: '2d6dbffdce9d62562f2fe8c0be2a0284bdc36b71fda2bc4600372810fa68e5bd',
//   authorizationUri: 'https://app.deco.network/oauth/authorize',
//   redirectUri: 'http://localhost:3000/auth/Deconet/callback',
// });

class Login extends React.Component {
  state = { email: '', password: '' };

  deconetOauth = () => {
    window.open("https://app.deco.network/oauth/authorize?response_type=code&client_id=2d6dbffdce9d62562f2fe8c0be2a0284bdc36b71fda2bc4600372810fa68e5bd&redirect_uri=" + escape(baseURL()) + "%2Fauth%2FDeconet%2Fcallback");
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  };

  render() {
    const { email, password } = this.state;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment raised>
            <Image centered src={require('../assets/images/logo.svg')} style={styles.logo} alt='HN Token'/>
            <p>Welcome to the bounty program for Health Nexus, the healthcare-safe blockchain. Find more about our project here: <a href='https://token.simplyvitalhealth.com'>https://token.simplyvitalhealth.com/</a></p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor='email'>Email</label>
                <input
                  required
                  id='email'
                  value={email}
                  placeholder='Email'
                  onChange={this.handleChange}
                  />
              </Form.Field>
              <Form.Field>
                <label htmlFor='password'>Password</label>
                <input
                  required
                  id='password'
                  value={password}
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                  />
              </Form.Field>
              <Link to={'/recover_password'}>Forgot Password?</Link>
              <Segment textAlign='center' basic>
                <Button primary type='submit'>Submit</Button>
              </Segment>
            </Form>
            <Button onClick={this.deconetOauth} style={styles.deconetButton}>Sign in with Deconet</Button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

var styles = {
  deconetButton: {
    backgroundColor: '#2678EA',
    color: 'white'
  },
  logo: {
    height: 'auto',
    width: 300,
  },
};

export default connect()(Login);
