import React from 'react';
import ReactQuill from 'react-quill';
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
    description: '',
    regulations: '',
    num_users: '',
    num_shares: '',
    telegram: '',
    telegram_invite: '',
    etherium_wallet: '',
    invitation_link: '',
  };

  handleChange = ( value, name ) => {
    this.setState( { [name]: value } );
  };

  handleSubmit = ( e ) => {
    e.preventDefault();
  };

  dashboard = () => {
    const {
      description,
      regulations,
      num_users,
      num_shares,
      telegram,
      telegram_invite,
      etherium_wallet,
      invitation_link,
    } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          color="violet"
          textAlign="center">
          Dashboard
        </Header>
        <Divider hidden />
        <Form onSubmit={ this.handleSubmit }>
          <Header as="h4" color="violet">
            Description
          </Header>
          <Form.Field>
            <ReactQuill
              value={ this.state.description }
              onChange={ ( value ) =>
                this.handleChange( value, 'description' )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Regulations
            </Header>
            <ReactQuill
              value={ this.state.regulations }
              onChange={ ( value ) =>
                this.handleChange( value, 'regulations' )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Number of Users
            </Header>
            <ReactQuill
              value={ this.state.num_users }
              onChange={ ( value ) =>
                this.handleChange( value, 'num_users' )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Number of Shares
            </Header>
            <ReactQuill
              value={ this.state.num_shares }
              onChange={ ( value ) =>
                this.handleChange( value, 'num_shares' )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Telegram
            </Header>
            <ReactQuill
              value={ this.state.telegram }
              onChange={ ( value ) =>
                this.handleChange( value, 'telegram' )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Invite to Telegram
            </Header>
            <ReactQuill
              value={ this.state.telegram_invite }
              onChange={ ( value ) =>
                this.handleChange(
                  value,
                  'telegram_invite',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Etherium Wallet
            </Header>
            <ReactQuill
              value={ this.state.etherium_wallet }
              onChange={ ( value ) =>
                this.handleChange(
                  value,
                  'etherium_wallet',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Invitation Link
            </Header>
            <ReactQuill
              value={ this.state.invitation_link }
              onChange={ ( value ) =>
                this.handleChange(
                  value,
                  'invitation_link',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Button
            size="normal"
            floated="right"
            color="green">
            Submit All Changes
          </Form.Button>
        </Form>
      </Container>
    );
  };
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            { this.dashboard() }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default DashboardForm;
