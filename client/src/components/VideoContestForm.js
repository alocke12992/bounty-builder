import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { toolbar } from './Settings';
import { updateSettings } from '../actions/settings';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class VideoContestForm extends React.Component {
  state = { video_rules: '' };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  toggleVideoContest = () => {
    this.setState({ video_show: !this.state.video_show });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const videoContest = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(videoContest));
    dispatch(
      setFlash(
        'Your changes to Video Contest have been submitted and saved.',
        'blue',
      ),
    );
  };

  videoContest = () => {
    const { video_rules, video_show } = this.state;
    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Video Contest
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            Enable Video Contest
          </Header>
          <Form.Field
              checked={video_show === true}
              control={Checkbox}
              label="Yes"
              onChange={this.toggleVideoContest}
          />
          <Divider />
          <Form.Field>
            <Header as="h4" color="blue">
              Rules
            </Header>
            <ReactQuill
              value={video_rules}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'video_rules')
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
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            {this.videoContest()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    video_rules,
    video_show,
    id,
  } = state.settings;
  return {
    video_rules,
    video_show,
    id,
  };
};

export default connect(mapStateToProps)(VideoContestForm);
