import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { toolbar } from './Settings';
import { updateSettings } from '../actions/settings';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
class DashboardForm extends React.Component {
  state = {
    dash_overview: '',
    dash_users: '',
    dash_tokens: '',
    dash_telegram: '',
    dash_ethereum: '',
    dash_invitation_link: '',
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const dashboard = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(dashboard));
    dispatch(
      setFlash(
        'Your changes to the Dashboard have been submitted and saved.',
        'blue',
      ),
    );
  };

  dashboard = () => {
    const {
      dash_overview,
      dash_users,
      dash_tokens,
      dash_telegram,
      dash_ethereum,
      dash_invitation_link,
    } = this.state;
    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Dashboard
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            Description
          </Header>
          <Form.Field>
            <ReactQuill
              value={dash_overview}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'dash_overview',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Number of Users
            </Header>
            <ReactQuill
              value={dash_users}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'dash_users')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Number of Tokens
            </Header>
            <ReactQuill
              value={dash_tokens}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'dash_tokens')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Telegram
            </Header>
            <ReactQuill
              value={dash_telegram}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'dash_telegram',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Etherium Wallet
            </Header>
            <ReactQuill
              value={dash_ethereum}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'dash_ethereum')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Invitation Link
            </Header>
            <ReactQuill
              value={dash_invitation_link}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'dash_invitation_link',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Button
            size="normal"
            floated="right"
            color="blue">
            Submit All Changes
          </Form.Button>
        </Form>
      </Container>
    );
  };

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              {this.dashboard()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    dash_overview,
    dash_users,
    dash_tokens,
    dash_telegram,
    dash_ethereum,
    dash_invitation_link,
    id,
  } = state.settings;
  return {
    dash_overview,
    dash_users,
    dash_tokens,
    dash_telegram,
    dash_ethereum,
    dash_invitation_link,
    id,
  };
};

export default connect(mapStateToProps)(DashboardForm);