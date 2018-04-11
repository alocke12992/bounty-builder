import React from 'react';
import ReactQuill from 'react-quill';
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
import { connect } from 'react-redux';

class InfluencerForm extends React.Component {
  state = {
    infl_submission: '',
    infl_bounties: '',
    infl_link: '',
  };

  componentDidMount() {
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
    dispatch(
      setFlash(
        'Your changes to the Influencer have been submitted and saved.',
        'blue',
      ),
    );
  };

  influencer = () => {
    const {
      infl_submission,
      infl_bounties,
      infl_link,
    } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Influencer
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header as="h4" color="blue">
              Rules
            </Header>
            <ReactQuill
              value={infl_submission}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'infl_submission',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Shares
            </Header>
            <ReactQuill
              value={infl_bounties}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'infl_bounties',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Link
            </Header>
            <ReactQuill
              value={infl_link}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'infl_link',
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
              {this.influencer()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    infl_submission,
    infl_bounties,
    infl_link,
    id,
  } = state.settings;
  return {
    infl_submission,
    infl_bounties,
    infl_link,
    id,
  };
};

export default connect(mapStateToProps)(InfluencerForm);
