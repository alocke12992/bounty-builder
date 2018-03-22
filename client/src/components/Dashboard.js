import React from 'react';
import axios from 'axios';
import ChatRules from './ChatRules';
import Discord from './Discord';
import Invite from './Invite';
import PointsTile from './PointsTile';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import Telegram from './Telegram';
import TextContent from './TextContent';
import TotalUsersTile from './TotalUsersTile';
import TotalSharesTile from './TotalSharesTile';
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
} from 'semantic-ui-react';

var Recaptcha = require('react-recaptcha');

class Dashboard extends React.Component {
  state = {
    captchaVerified: false,
    confirmationCode: '',
    loading: true,
  };

  callback = res => {
    this.setState({ captchaVerified: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { confirmationCode } = this.state;
    axios
      .post('/api/confirmations/verify_confirmation', {
        confirmation_code: confirmationCode,
      })
      .then(res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch({ type: 'LOGOUT' });
        this.props.dispatch(
          setFlash(
            'Account Confirmed. Please log in again.',
            'green',
          ),
        );
      })
      .catch(err => {
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
      .get(
        '/api/confirmations/resend_confirmation_email',
      )
      .then(res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(
          setFlash(
            'Email Sent. Please check your junk folder if email does not arrive.',
            'green',
          ),
        );
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      });
  };

  render() {
    const {
      captchaVerified,
      confirmationCode,
      edit,
      property,
      textHeader,
      textRules,
    } = this.state;

    return (
      <Container>
        { !this.props.user.confirmed && (
          <Segment color="red">
            <p>
              Your account needs to be confirmed.
              Please check your email for a
              confirmation code and enter it here.
            </p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                value={confirmationCode}
                onChange={e =>
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
        <TextContent />
        <Segment>
          <div>
            <p
              style={{
                marginBottom: '11.0pt',
                lineHeight: '142%',
              }}>
              <strong>
                <span
                  style={{
                    fontSize: '10.5pt',
                    lineHeight: '142%',
                  }}>
                  DO:
                </span>
              </strong>
            </p>
            <ul>
              <li
                style={{
                  marginBottom: '11.0pt',
                  lineHeight: '142%',
                }}>
                <strong>
                  <span
                    style={{
                      fontSize: '10.5pt',
                      lineHeight: '142%',
                    }}>
                    Disclose that you are receiving DCO
                    for growing the community:{' '}
                  </span>
                </strong>
                <span
                  style={{
                    fontSize: '10.5pt',
                    lineHeight: '142%',
                  }}>
                  “Disclaimer: I am receiving DCO for
                  growing the community.”
                </span>
              </li>
              <li
                style={{
                  marginBottom: '11.0pt',
                  lineHeight: '142%',
                }}>
                <strong>
                  <span
                    style={{
                      fontSize: '10.5pt',
                      lineHeight: '142%',
                    }}>
                    When you talk about Deconet, focus
                    on the importance of the solution:{' '}
                  </span>
                </strong>
                <span
                  style={{
                    fontSize: '10.5pt',
                    lineHeight: '142%',
                  }}>
                  creating a sustainable economic
                  backbone for open source development
                  and paving a path to more
                  distributed, remote, and gig-based
                  work.
                </span>
              </li>
              <li
                style={{
                  marginBottom: '11.0pt',
                  lineHeight: '142%',
                }}>
                <strong>
                  <span
                    style={{
                      fontSize: '10.5pt',
                      lineHeight: '142%',
                    }}>
                    Explain what the utility of the DCO
                    token is:
                  </span>
                </strong>
                <span
                  style={{
                    fontSize: '10.5pt',
                    lineHeight: '142%',
                  }}>
                  {' '}
                  the token is used to access and power
                  the crowd curation element of
                  Deconet’s software platform. Also,
                  companies and blockchain projects can
                  use the token to create challenges
                  for the Deconet community.{' '}
                </span>
              </li>
            </ul>
            <p
              style={{
                marginBottom: '11.0pt',
                lineHeight: '142%',
              }}>
              <strong>
                <span
                  style={{
                    fontSize: '10.5pt',
                    lineHeight: '142%',
                  }}>
                  DON’T:
                </span>
              </strong>
            </p>
            <ul>
              <li
                style={{
                  marginBottom: '11.0pt',
                  lineHeight: '142%',
                }}>
                <strong>
                  <span
                    style={{
                      fontSize: '10.5pt',
                      lineHeight: '142%',
                    }}>
                    Don’t refer to DCO token as an
                    investment:{' '}
                  </span>
                </strong>
                <span
                  style={{
                    fontSize: '10.5pt',
                    lineHeight: '142%',
                  }}>
                  the Deconet token has utility from
                  day one, allowing the crowd to access
                  and curate software projects on the
                  Deconet platform.
                </span>
              </li>
              <li
                style={{
                  marginBottom: '11.0pt',
                  lineHeight: '142%',
                }}>
                <strong>
                  <span
                    style={{
                      fontSize: '10.5pt',
                      lineHeight: '142%',
                    }}>
                    Don’t use the terms “ICO” or
                    “initial coin offering.”{' '}
                  </span>
                </strong>
                <span
                  style={{
                    fontSize: '10.5pt',
                    lineHeight: '142%',
                  }}>
                  You can say “token generation”.
                </span>
              </li>
              <li
                style={{
                  marginBottom: '11.0pt',
                  lineHeight: '142%',
                }}>
                <strong>
                  <span
                    style={{
                      fontSize: '10.5pt',
                      lineHeight: '142%',
                    }}>
                    Don’t discuss or hint at price
                    increasing.{' '}
                  </span>
                </strong>
              </li>
              <li
                style={{
                  marginBottom: '11.0pt',
                  lineHeight: '142%',
                }}>
                <strong>
                  <span
                    style={{
                      fontSize: '10.5pt',
                      lineHeight: '142%',
                    }}>
                    Don’t discuss exchanges.
                  </span>
                </strong>
              </li>
            </ul>
          </div>
        </Segment>
        <Card.Group itemsPerRow={2}>
          <TotalUsersTile />
          <TotalSharesTile />
        </Card.Group>
        <Card.Group itemsPerRow={2}>
          <ChatRules />
          <Telegram />
          {/*<Discord/>*/}
        </Card.Group>
        <Card.Group itemsPerRow={1}>
          <Wallet />
        </Card.Group>
        <Invite />
        <Segment>
          <Header>Totals</Header>
        </Segment>
        <Card.Group itemsPerRow={3}>
          <PointsTile
            source="facebook"
            title="Facebook"
          />
          <PointsTile
            source="twitter"
            title="Twitter"
          />
          <PointsTile
            source="linkedin"
            title="LinkedIn"
          />
          <PointsTile source="reddit" title="Reddit" />
          <PointsTile
            source="influencer"
            title="Influencer"
          />
          <PointsTile
            source="telegram"
            title="Telegram"
          />
          {/*<PointsTile source="discord" title="Discord" />*/}
          <PointsTile
            source="invitation"
            title="Invite"
          />
          <PointsTile
            source="translation"
            title="Translation"
          />
        </Card.Group>
      </Container>
    );
  }
}

const Text = styled.p`
  color: blue;
`;
const logo = image => {
  require(`../assets/images/${image}`);
};

const imageSize = size => {
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

const Image = styled.img`
  width: auto;
  height: ${props =>
    imageSize(props.isize)} !important;
`;
const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Dashboard);
