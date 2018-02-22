import React, { Component } from 'react';
import { Form, Button, Segment, Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { setFlash } from '../actions/flash';
var Recaptcha = require('react-recaptcha');

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '', invite_code: '', captchaVerified: false };

  componentDidMount(){
    if (this.props.location.search)
      this.setState({invite_code: this.props.location.search.split('?invite_code=')[1]})
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
};

export default connect()(Register);
