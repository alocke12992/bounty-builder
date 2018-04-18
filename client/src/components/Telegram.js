import React from 'react';
import axios from 'axios';
import StyledButton from '../styledcomponents/StyledButton';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {setHeaders} from '../actions/headers';
import {
  Button,
  Card,
  Divider,
  Form,
  Header,
  Icon,
} from 'semantic-ui-react';
import GenerateHtml from './GenerateHtml';

class Telegram extends React.Component {
  state = {username: '', showField: false};

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
    this.setState({username: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {username} = this.state;
    axios
      .post('/api/telegram', {username})
      .then((res) => {
        this.setState({showField: false});
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(
          setFlash('Telegram updated', 'green'),
        );
      })
      .catch((err) => {
        this.props.dispatch(setHeaders(err.headers));
      });
  };

  render() {
    const {username, showField} = this.state;
    const {
      dash_telegram,
      dash_telegram_disc_link,
      dash_telegram_anno_link,
    } = this.props;

    return (
      <Card fluid>
        <Card.Header>
          <Divider hidden />
          <Header as="h1" textAlign="center">
            Telegram
          </Header>
        </Card.Header>
        <Card.Content textAlign="center">
          <GenerateHtml text={dash_telegram} />
          <Divider hidden />
          <Button
            as="a"
            color="twitter"
            href={`${dash_telegram_disc_link}`}
            target="_blank">
            <Icon name="telegram" /> Discussion Channel
          </Button>
          <Button
            as="a"
            color="twitter"
            href={`${dash_telegram_anno_link}`}
            target="_blank">
            <Icon name="telegram" /> Announcement Channel
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
              <StyledButton
                backgroundColor={this.props.buttonColor}
                fontColor={this.props.fontColor}
                border={this.props.borderColor}
              >
                Submit For Approval
              </StyledButton>
            )}
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
    dash_telegram_disc_link,
    dash_telegram_anno_link,
  } = state.settings;
  return {
    dash_telegram: state.settings.dash_telegram,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
    dash_telegram_disc_link,
    dash_telegram_anno_link,
  };
};

export default connect(mapStateToProps)(Telegram);
