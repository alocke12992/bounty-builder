import React from 'react';
import axios from 'axios';
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
  Icon,
} from 'semantic-ui-react';

class Telegram extends React.Component {
  state = { showField: false, username: '' };

  componentDidMount() {
    axios.get('/api/telegram').then((res) => {
      let showField;
      if (res.data == null) {
        showField = true;
      } else {
        showField = false;
      }
      this.props.dispatch(setHeaders(res.headers));
      this.setState({
        username: res.data ? res.data.username : '',
        showField,
      });
    });
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = this.state;
    axios
      .post('/api/telegram', { username })
      .then((res) => {
        this.setState({ showField: false });
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(
          setFlash('Telegram updated', 'green'),
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
    const { showField, username } = this.state;
    const { telegram_invite } = this.props;

    return (
      <Card>
        <Card.Header>
          <Divider hidden />
          <Header as="h1" textAlign="center">
            Telegram
          </Header>
        </Card.Header>
        <Divider hidden />
        <Card.Content textAlign="center">
          <Container
            dangerouslySetInnerHTML={this.createMarkup(
              telegram_invite,
            )}
          />
          <Divider hidden />
          <Button
            as="a"
            color="twitter"
            href="https://t.me/deco_network"
            target="_blank">
            <Icon name="telegram" /> Telegram
          </Button>
          <Divider hidden />
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={username}
              onChange={this.handleChange}
              required
              placeholder="Telegram Username"
              disabled={!showField}
            />
            {showField && (
              <Form.Button>Submit for Approval</Form.Button>
            )}
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    telegram_invite: state.settings.telegram_invite,
  };
};

export default connect(mapStateToProps)(Telegram);
