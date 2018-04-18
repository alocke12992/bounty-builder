import React from 'react';
import ReactQuill from 'react-quill';
import StyledButton from '../styledcomponents/StyledButton';
import {connect} from 'react-redux';
import {toolbar} from './Settings';
import {setFlash} from '../actions/flash';
import {updateSettings} from '../actions/settings';
import {
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
} from 'semantic-ui-react';

class VideoContestForm extends React.Component {
  state = {video_rules: '', video_link: ''};

  componentDidMount() {
    this.setState({...this.props});
  }

  toggleVideoContest = () => {
    this.setState({video_show: !this.state.video_show});
  };

  handleChange = (value, name) => {
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const videoContest = {...this.state};
    const {dispatch} = this.props;
    dispatch(updateSettings(videoContest));
    dispatch(
      setFlash(
        'Your changes to Video Contest have been submitted and saved.',
        'blue',
      ),
    );
  };

  videoContest = () => {
    const {video_rules, video_show, video_link} = this.state;
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
              modules={{toolbar}}
              onChange={(value) =>
                this.handleChange(value, 'video_rules')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Link
            </Header>
            <Form.Input
              value={video_link}
              onChange={(e) =>
                this.handleChange(e.target.value, 'video_link')
              }
            />
            <Divider hidden />
          </Form.Field>
          <StyledButton
            backgroundColor={this.props.buttonColor}
            fontColor={this.props.fontColor}
            border={this.props.borderColor}
            floated='right'
          >
            Submit All Changes
          </StyledButton>
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
    video_link,
    video_rules,
    video_show,
    id,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    video_link,
    video_rules,
    video_show,
    id,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};

export default connect(mapStateToProps)(VideoContestForm);
