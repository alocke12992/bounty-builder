import React, { Component } from 'react';
import { Form, Button, Segment, Grid, Image, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { setFlash } from '../actions/flash';
import { baseURL } from '../utils/urls';
var Recaptcha = require('react-recaptcha');
const queryString = require('query-string');
// var ClientOAuth2 = require('client-oauth2')
//
// var deconetAuth = new ClientOAuth2({
//   clientId: '2d6dbffdce9d62562f2fe8c0be2a0284bdc36b71fda2bc4600372810fa68e5bd',
//   authorizationUri: 'https://app.deco.network/oauth/authorize',
//   redirectUri: 'http://localhost:3000/auth/Deconet/callback',
// })

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '', invite_code: '', captchaVerified: false };

  componentDidMount(){
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.invite_code)
      this.setState({ invite_code: parsed.invite_code })
  }

  handleSubmit = event => {
    if(this.state.captchaVerified){
      event.preventDefault();
      const { email, password, passwordConfirmation, invite_code} = this.state;
      const { dispatch, history } = this.props;
      if (password === passwordConfirmation) {
        dispatch(registerUser(email, password, passwordConfirmation, history, invite_code));
      } else dispatch(setFlash('Passwords do not match!, please try again', 'red'));
    }
  }

  handleChange = event => {
    // use e to grab the id off the element also the value and set state
    // const { id, value } = event.target;
    const id = event.target.id;
    const value = event.target.value;
    this.setState({ [id]: value });
  }

  callback = (res) => {
    this.setState({captchaVerified: true});
  }

  deconetOauth = () => {
    window.open("https://app.deco.network/oauth/authorize?response_type=code&client_id=2d6dbffdce9d62562f2fe8c0be2a0284bdc36b71fda2bc4600372810fa68e5bd&redirect_uri=" + escape(baseURL()) + "%2Fauth%2FDeconet%2Fcallback&state=" + JSON.stringify({invite_code: this.state.invite_code}));
  }

  render() {
    const { email, password, passwordConfirmation, invite_code, captchaVerified } = this.state;

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
                  id='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  placeholder='Password'
                  type='password'
                  required
                  value={password}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='passwordConfirmation'>Password Confirmation</label>
                <input
                  id='passwordConfirmation'
                  placeholder='Password Confirmation'
                  type='password'
                  required
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Invite Code (Fill in if you are using a referral code from a friend)</label>
                <input
                  id='invite_code'
                  placeholder='Invite Code'
                  value={invite_code}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Recaptcha
                sitekey="6LcsL0wUAAAAAPi-dEhwqV1TI7fIopO8lP3HGN_v"
                verifyCallback={this.callback}
              />
              <Segment basic textAlign='center'>
                <Button type='submit' disabled={!captchaVerified} >Submit</Button>
              </Segment>
            </Form>
            <Divider horizontal>Or</Divider>
            <Button fluid onClick={this.deconetOauth} style={styles.deconetButton}>Register with Deconet</Button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

var styles = {
  logo: {
    width: 300,
    height: 'auto'
  },
  deconetButton: {
    backgroundColor: '#2678EA',
    color: 'white'
  }
};

export default connect()(Register);
