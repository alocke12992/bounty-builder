import React from 'react';
import ReactQuill from 'react-quill';
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
import { connect } from 'react-redux';

class InfluencerForm extends React.Component {
  initialState = {
    influencer_rules: '',
    influencer_shares: '',
    influencer_link: '',
    id: null,
  }

  state = { ...this.initialState };

  componentWillMount() {
    this.setState({ ...this.props });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const influencer = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(influencer));
    this.setState({ influencer });
  };

    influencer = () => {
    const { 
      influencer_rules,
      influencer_shares, 
      influencer_link,
    } = this.props;

    return (
      <Container>
        <Header
          as="h1"
          color="olive"
          textAlign="center">
          Influencer
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="olive">
              Rules
            </Header>
            <ReactQuill
              value={this.state.influencer_rules}
              onChange={(value) =>
                this.handleChange(value, 'influencer_rules')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="olive">
              Shares
            </Header>
            <ReactQuill
              value={this.state.influencer_shares}
              onChange={(value) =>
                this.handleChange(value, 'influencer_shares')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="olive">
              Link
            </Header>
            <ReactQuill
              value={this.state.influencer_link}
              onChange={(value) =>
                this.handleChange(value, 'influencer_link')
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
          <Grid.Column width={16}>
            {this.influencer()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    influencer_rules,
    influencer_shares,
    influencer_link,
    id,
  } = state.settings
  return {
    influencer_rules,
    influencer_shares,
    influencer_link,
    id,
  }
}

export default connect(mapStateToProps)(InfluencerForm);
