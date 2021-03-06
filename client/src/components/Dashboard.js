import React from 'react';
import axios from 'axios';
import GenerateHtml from './GenerateHtml';
import Invite from './Invite';
import PointsTile from './PointsTile';
import Telegram from './Telegram';
import TotalTokensTile from './TotalTokensTile';
import TotalUsersTile from './TotalUsersTile';
import Wallet from './Wallet';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {setHeaders} from '../actions/headers';
import StyledButton from '../styledcomponents/StyledButton';
import {
  Button,
  Card,
  Container,
  Divider,
  Image,
  Form,
  Header,
  Segment,
  Responsive,
} from 'semantic-ui-react';

var Recaptcha = require('react-recaptcha');

class Dashboard extends React.Component {
  state = {
    captchaVerified: false,
    confirmationCode: '',
    liveStreamConfirmationCode: '',
    loading: true,
    showLiveStreamForm: true,
  };

  callback = (res) => {
    this.setState({captchaVerified: true});
  };

  handleLiveStreamSubmit = (e) => {
    e.preventDefault();
    const {liveStreamConfirmationCode} = this.state;
    const {dispatch} = this.props;
    axios.post('/api/confirm_live_stream_code', {code: liveStreamConfirmationCode})
      .then(res => {
        dispatch(setHeaders(res.headers));
        dispatch({type: 'LOGIN', user: res.data});
        dispatch(setFlash('Code Confirmed.', 'green'));
        this.setState({showLiveStreamForm: false});
      })
      .catch(err => {
        dispatch(setHeaders(err.headers));
        dispatch({type: 'LOGOUT'});
        dispatch(setFlash('The confirmation code was incorrect. For account security, you have been logged out.', 'red'));
      })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {confirmationCode} = this.state;
    const {dispatch} = this.props;
    axios.post('/api/confirmations/verify_confirmation', {confirmation_code: confirmationCode})
      .then(res => {
        dispatch(setHeaders(res.headers));
        dispatch({type: 'LOGOUT'})
        dispatch(setFlash('Account Confirmed. Please log in again.', 'green'));
      })
      .catch(err => {
        dispatch({type: 'LOGOUT'});
        dispatch(setFlash('The confirmation code was incorrect.', 'red'));
        dispatch(setHeaders(err.headers));
        this.setState({captchaVerified: false});
      })
  };

  renderConfirmationSegment = () => {
    const {captchaVerified, confirmationCode, } = this.state;
    return (
      <Segment color="red">
        <p>
          Your account needs to be confirmed. Please
          check your email for a confirmation code and
          enter it here.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            value={confirmationCode}
            onChange={(e) =>
              this.setState({
                confirmationCode: e.target.value,
              })
            }
            required
            placeholder="Confirmation Code"
          />
          <StyledButton
            backgroundColor={this.props.buttonColor}
            fontColor={this.props.fontColor}
            border={this.props.borderColor}
          >
            Submit
              </StyledButton>
        </Form>
        <Divider />
        <Recaptcha
          sitekey="6LcsL0wUAAAAAPi-dEhwqV1TI7fIopO8lP3HGN_v"
          verifyCallback={this.callback}
        />
        <Button
          disabled={!captchaVerified}
          onClick={this.resendConfirmationEmail}
        >
          Resend confirmation code
        </Button>
      </Segment>
    );
  };

  resendConfirmationEmail = () => {
    axios
      .get('/api/confirmations/resend_confirmation_email')
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(
          setFlash(
            'Email Sent. Please check your junk folder if email does not arrive.',
            'green',
          ),
        );
      })
      .catch((err) => {
        this.props.dispatch(setHeaders(err.headers));
      });
  };

  render() {
    const {
      liveStreamConfirmationCode,
      showLiveStreamForm,
    } = this.state;
    const {dash_overview, logo} = this.props;
    return (
      <Container>
        {/* ---  Confirmation Code  --- */}
        {/* {!this.props.user.confirmed && (
          this.renderConfirmationSegment() 
        )} */}
        {!this.props.user.live_stream_confirmed && showLiveStreamForm &&
          <Segment color='red'>
            <p><strong>All participants must enter a code from the weekly live stream to receive any earned rewards.</strong></p>
            <br />
            <Form onSubmit={this.handleLiveStreamSubmit}>
              <Form.Input
                value={liveStreamConfirmationCode}
                onChange={(e) => this.setState({liveStreamConfirmationCode: e.target.value})}
                required
                placeholder="Live Stream Code"
              />
              <StyledButton
                backgroundColor={this.props.buttonColor}
                fontColor={this.props.fontColor}
                border={this.props.borderColor}
              >
                Submit
              </StyledButton>
            </Form>
          </Segment>
        }
        <Segment>
          <Responsive
            as={Image}
            minWidth={992}
            src={logo}
            style={{height: '85px', width: 'auto'}}
            alt="HN Token"
            centered
          />
          <Responsive
            as={Divider}
            minWidth={992}
          />
          <GenerateHtml text={dash_overview} />
        </Segment>
        <Responsive
          as={Card.Group}
          minWidth={767}
          itemsPerRow={2}>
          <TotalUsersTile />
          <TotalTokensTile />
        </Responsive>
        <Responsive
          as={Card.Group}
          maxWidth={767}
          itemsPerRow={1}>
          <TotalUsersTile />
          <TotalTokensTile />
        </Responsive>
        <Telegram />
        <Wallet />
        <Invite />
        <Segment>
          <Header>Totals</Header>
        </Segment>
        <Responsive
          as={Card.Group}
          maxWidth={767}
          itemsPerRow={2}>
          <PointsTile source="facebook" title="Facebook" />
          <PointsTile source="twitter" title="Twitter" />
          <PointsTile source="linkedin" title="LinkedIn" />
          <PointsTile source="reddit" title="Reddit" />
          <PointsTile
            source="influencer"
            title="Influencer"
          />
          <PointsTile source="telegram" title="Telegram" />
          {/*<PointsTile source="discord" title="Discord" />*/}
          <PointsTile source="invitation" title="Invite" />
          <PointsTile
            source="translation"
            title="Translation"
          />
        </Responsive>
        <Responsive
          Responsive
          as={Card.Group}
          minWidth={767}
          itemsPerRow={4}>
          <PointsTile source="facebook" title="Facebook" />
          <PointsTile source="twitter" title="Twitter" />
          <PointsTile source="linkedin" title="LinkedIn" />
          <PointsTile source="reddit" title="Reddit" />
          <PointsTile
            source="influencer"
            title="Influencer"
          />
          <PointsTile source="telegram" title="Telegram" />
          {/*<PointsTile source="discord" title="Discord" />*/}
          <PointsTile source="invitation" title="Invite" />
          <PointsTile
            source="translation"
            title="Translation"
          />
        </Responsive>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {user, settings} = state;
  const {
    dash_overview,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    user,
    dash_overview,
    logo: settings.theme_logo,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};

export default connect(mapStateToProps)(Dashboard);