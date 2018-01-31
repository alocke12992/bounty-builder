import React, { Component } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/auth';

class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  }

  render() {
    const { email, password } = this.state;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment raised>
            <div style={{textAlign: 'center'}}>
              <img src={require('../assets/images/HN_token_transparent.png')} style={styles.logo} alt='HN Token'/>
            </div>
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
              <Segment textAlign='center' basic>
                <Button primary type='submit'>Submit</Button>
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
    width: '120px',
    height: '120px'
  }
};

export default connect()(Login);
