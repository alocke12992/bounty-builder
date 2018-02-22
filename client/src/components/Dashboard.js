import React from 'react';
import { Container, Card, Segment, Header, Form, Button, Divider } from 'semantic-ui-react';
import PointsTile from './PointsTile';
import TotalUsersTile from './TotalUsersTile';
import TotalSharesTile from './TotalSharesTile';
import Invite from './Invite';
import Wallet from './Wallet';
import ChatRules from './ChatRules';
import Telegram from './Telegram';
import Discord from './Discord';
import { connect } from 'react-redux';
import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
var Recaptcha = require('react-recaptcha');

class Dashboard extends React.Component{
  state = { loading: true, confirmationCode: '', captchaVerified: false }

  callback = (res) => {
    this.setState({captchaVerified: true});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { confirmationCode } = this.state;
    axios.post('/api/confirmations/verify_confirmation', { confirmation_code: confirmationCode } )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch({type: 'LOGOUT'})
        this.props.dispatch(setFlash('Account Confirmed. Please log in again.', 'green'));
      })
      .catch( err => {
        this.props.dispatch({type: 'LOGOUT'});
        this.props.dispatch(setFlash('The confirmation code was incorrect.', 'red'));
        this.props.dispatch(setHeaders(err.headers));
        this.setState({captchaVerified: false});
      })
  }

  resendConfirmationEmail = () => {
    axios.get('/api/confirmations/resend_confirmation_email' )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Email Sent. Please check your junk folder if email does not arrive.', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  }

  render(){
    const { confirmationCode, captchaVerified } = this.state;
    return(
      <Container>
        { !this.props.user.confirmed &&
          <Segment color='red'>
            <p>Your account needs to be confirmed. Please check your email for a confirmation code and enter it here.</p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                value={confirmationCode}
                onChange={(e) => this.setState({ confirmationCode: e.target.value })}
                required
                placeholder="Confirmation Code"
              />
              <Form.Button>Submit</Form.Button>
            </Form>
            <Divider />
            <Recaptcha
              sitekey="6LcsL0wUAAAAAPi-dEhwqV1TI7fIopO8lP3HGN_v"
              verifyCallback={this.callback}
            />
          <Button disabled={!captchaVerified} onClick={this.resendConfirmationEmail}>Resend confirmation code</Button>
          </Segment>
        }
        <Segment>
          <img
            src={require('../assets/images/logo.svg')}
            style={{height: '75px', width: 'auto'}}
            onClick={() => this.props.history.push('/')}
            alt='HN Token'
          />
          <p>Welcome to the bounty program for Health Nexus, the healthcare-safe blockchain. Find more about our project here: <a href='https://token.simplyvitalhealth.com'>https://token.simplyvitalhealth.com/</a></p>
        </Segment>
        <Segment>
          <div dir="auto">DO:</div>
          <div dir="auto">&bull;Disclose that you are receiving HLTH for growing the community &mdash; &ldquo;Disclaimer: I am receiving HLTH for growing the community.&rdquo;</div>
          <div dir="auto">&bull;When you talk about Health Nexus, focus on the importance of the solution &mdash; reducing medical costs, giving individuals more control over their health data, opening up possibilities for innovation in medical research.</div>
          <div dir="auto">&bull;Explain what the utility of the HTLH token is &mdash; the token is required to transfer data within the Health Nexus platform.</div>
          <div dir="auto">&nbsp;</div>
          <div dir="auto">DON&rsquo;T:</div>
          <div dir="auto">&bull;Don&rsquo;t refer to HTLH token as an investment. It is a token that has utility from day 1 that allows data to be transferred within the Health Nexus platform.</div>
          <div dir="auto">&bull;Don&rsquo;t use the terms &ldquo;ICO&rdquo; or &ldquo;initial coin offering.&rdquo; You can say &ldquo;token sale.&rdquo;</div>
          <div dir="auto">&bull;Don&rsquo;t discuss or hint at price increasing.&nbsp;</div>
          <div dir="auto">&bull;Don&rsquo;t discuss exchanges.</div>
        </Segment>
        <Card.Group itemsPerRow={2}>
          <TotalUsersTile />
          <TotalSharesTile />
        </Card.Group>
        <Card.Group itemsPerRow={3}>
          <ChatRules/>
          <Telegram/>
          <Discord/>
        </Card.Group>
        <Card.Group itemsPerRow={1}>
          <Wallet />
        </Card.Group>
        <Invite />
        <Segment><Header>Totals</Header></Segment>
        <Card.Group itemsPerRow={3}>
          <PointsTile source="facebook" title="Facebook" />
          <PointsTile source="twitter" title="Twitter" />
          <PointsTile source="linkedin" title="LinkedIn" />
          <PointsTile source="reddit" title="Reddit" />
          <PointsTile source="influencer" title="Influencer" />
          <PointsTile source="telegram" title="Telegram" />
          <PointsTile source="discord" title="Discord" />
          <PointsTile source="invitation" title="Invite" />
          <PointsTile source="translation" title="Translation" />
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}
export default connect(mapStateToProps)(Dashboard);
