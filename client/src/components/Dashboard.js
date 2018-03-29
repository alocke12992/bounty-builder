import React from 'react';
import axios from 'axios';
import ChatRules from './ChatRules';
import Invite from './Invite';
import PointsTile from './PointsTile';
import styled from 'styled-components';
import Telegram from './Telegram';
import TotalSharesTile from './TotalSharesTile';
import TotalUsersTile from './TotalUsersTile';
import Wallet from './Wallet';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import {
  Button,
  Card,
  Container,
  Divider,
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
    loading: true,
  };

  callback = (res) => {
    this.setState({ captchaVerified: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { confirmationCode } = this.state;
    axios
      .post('/api/confirmations/verify_confirmation', {
        confirmation_code: confirmationCode,
      })
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch({ type: 'LOGOUT' });
        this.props.dispatch(
          setFlash(
            'Account Confirmed. Please log in again.',
            'green',
          ),
        );
      })
      .catch((err) => {
        this.props.dispatch({ type: 'LOGOUT' });
        this.props.dispatch(
          setFlash(
            'The confirmation code was incorrect.',
            'red',
          ),
        );
        this.props.dispatch(setHeaders(err.headers));
        this.setState({ captchaVerified: false });
      });
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

  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const {
      captchaVerified,
      confirmationCode,
    } = this.state;

    const { dash_description, regulations } = this.props;

    return (
      <Container>
        {!this.props.user.confirmed && (
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
              <Form.Button>Submit</Form.Button>
            </Form>
            <Divider />
            <Recaptcha
              sitekey="6LcsL0wUAAAAAPi-dEhwqV1TI7fIopO8lP3HGN_v"
              verifyCallback={this.callback}
            />
            <Button
              disabled={!captchaVerified}
              onClick={this.resendConfirmationEmail}>
              Resend confirmation code
            </Button>
          </Segment>
        )}
        <Segment>
          <Responsive
            as={Image}
            minWidth={768}
            src={require('../assets/images/logo.svg')}
            style={{ height: '75px', width: 'auto' }}
            alt="HN Token"
          />
          <Responsive
            as={Image}
            maxWidth={767}
            src={require('../assets/images/logo.svg')}
            style={{ height: '60px', width: 'auto' }}
            alt="HN Token"
          />
          <Divider />
          <Container
            dangerouslySetInnerHTML={this.createMarkup(
              dash_description,
            )}
          />
        </Segment>
        <Segment>
          <Container
            dangerouslySetInnerHTML={this.createMarkup(
              regulations,
            )}
          />
        </Segment>
        <Responsive
          as={Card.Group}
          minWidth={767}
          itemsPerRow={2}>
          <TotalUsersTile />
          <TotalSharesTile />
        </Responsive>
        <Responsive
          as={Card.Group}
          maxWidth={767}
          itemsPerRow={1}>
          <TotalUsersTile />
          <TotalSharesTile />
        </Responsive>
        <Responsive
          Responsive
          as={Card.Group}
          minWidth={767}
          itemsPerRow={2}>
          <ChatRules />
          <Telegram />
          {/*<Discord/>*/}
        </Responsive>
        <Responsive
          as={Card.Group}
          maxWidth={767}
          itemsPerRow={1}>
          <ChatRules />
          <Telegram />
          {/*<Discord/>*/}
        </Responsive>
        <Card.Group itemsPerRow={1}>
          <Wallet />
        </Card.Group>
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
  const { user } = state;
  const { dash_description, regulations } = state.settings;

  return {
    user,
    dash_description,
    regulations,
  };
};

const Image = styled.img`
  height: ${(props) => imageSize(props.isize)} !important;
  width: auto;
`;

const imageSize = (size) => {
  switch (size) {
    case 'large':
      return '150px';
    case 'small':
      return '50px';
    case 'mini':
      return '25px';
    default:
      return '75px';
  }
};

const logo = (image) => {
  require(`../assets/images/${image}`);
};

const Text = styled.p`
  color: blue;
`;

export default connect(mapStateToProps)(Dashboard);
