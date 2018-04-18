import React from 'react';
import axios from 'axios';
import StyledButton from '../styledcomponents/StyledButton';
import Welcome from './Welcome';
import {connect} from 'react-redux';
import {baseURL} from '../utils/urls';
import {handleLogin} from '../actions/auth';
import {Link} from 'react-router-dom';
import {setHeaders} from '../actions/headers';
import {setFlash} from '../actions/flash';
import {Button, Form, Grid, Image, Segment, } from 'semantic-ui-react';
const queryString = require('query-string');
// var ClientOAuth2 = require('client-oauth2');
//
// var deconetAuth = new ClientOAuth2({
//   clientId: '2d6dbffdce9d62562f2fe8c0be2a0284bdc36b71fda2bc4600372810fa68e5bd',
//   authorizationUri: 'https://app.deco.network/oauth/authorize',
//   redirectUri: 'http://localhost:3000/auth/Deconet/callback',
// });

class Login extends React.Component {
  state = {email: '', password: ''};

  deconetOauth = () => {
    window.open("https://app.deco.network/oauth/authorize?response_type=code&client_id=2d6dbffdce9d62562f2fe8c0be2a0284bdc36b71fda2bc4600372810fa68e5bd&redirect_uri=" + escape(baseURL()) + "%2Fauth%2FDeconet%2Fcallback");
  };

  handleChange = event => {
    const {id, value} = event.target;
    this.setState({[id]: value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const {dispatch, history} = this.props;
    const {email, password} = this.state;
    dispatch(handleLogin(email, password, history));
  };

  render() {
    const {email, password} = this.state;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment raised>
            <Image
              src={this.props.logo}
              centered
              style={{height: '150px'}}
              alt="HN Text"
            />
            <div><Welcome/></div>
            <br />
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
                <StyledButton
                  backgroundColor={this.props.buttonColor}
                  fontColor={this.props.fontColor}
                  border={this.props.borderColor}
                >
                  Submit
                  </StyledButton>
              </Segment>
            </Form>
            <Segment textAlign='center' basic>
              <StyledButton
                backgroundColor={this.props.buttonColor}
                fontColor={this.props.fontColor}
                border={this.props.borderColor}
                onClick={this.deconetOauth}
              >
                Sign in with Deconet
              </StyledButton>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    theme_logo,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    logo: theme_logo,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  }
}

export default connect(mapStateToProps)(Login);
