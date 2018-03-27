import React, { Component } from 'react';
import { Form, Button, Segment, Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sendPasswordReset, recoverPassword } from '../actions/auth';

class RecoverPassword extends Component {
  state = { email: '', emailSent: false, password: '', passwordConfirmation: '', token: '' };

  componentDidMount(){
    if (this.props.location.search)
      this.setState({token: this.props.location.search.split('?token=')[1]})
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(sendPasswordReset(email,() => this.setState({emailSent: true})));
  }

  handleNewPasswordSubmit = event => {
    event.preventDefault();
    const { password, passwordConfirmation, token } = this.state;
    const { dispatch, history } = this.props;
    dispatch(recoverPassword(password, passwordConfirmation, token, history));
  }

  handleChange = event => {
    // use e to grab the id off the element also the value and set state
    // const { id, value } = event.target;
    const id = event.target.id;
    const value = event.target.value;
    this.setState({ [id]: value });
  }

  render() {
    const { email, emailSent, password, passwordConfirmation, token } = this.state;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment raised>
            <Image centered src={require('../assets/images/logo.svg')} style={styles.logo} alt='HN Token'/>
            { emailSent ?
              <p>An email has been sent containing password reset instructions.</p>
              :
                token !== '' ?
                <Form onSubmit={this.handleNewPasswordSubmit}>
                  <p>Enter your new password.</p>
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
                  <Segment basic textAlign='center'>
                    <Button type='submit'>Submit</Button>
                  </Segment>
                </Form>
                :
              <Form onSubmit={this.handleSubmit}>
                <p>Please enter the email that you used to register.</p>
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
                <Segment basic textAlign='center'>
                  <Button type='submit'>Submit</Button>
                </Segment>
              </Form>
            }
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

export default connect()(RecoverPassword);
