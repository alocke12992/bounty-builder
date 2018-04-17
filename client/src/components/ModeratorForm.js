import React from 'react';
import ReactQuill from 'react-quill';
import StyledButton from '../styledcomponents/StyledButton';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { toolbar } from './Settings';
import { updateSettings } from '../actions/settings';
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
} from 'semantic-ui-react';

class ModeratorForm extends React.Component {
  state = { mod_new_post: '' };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const moderator = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(moderator));
    dispatch(
      setFlash(
        'Your changes to Moderator have been submitted and saved.',
        'blue',
      ),
    );
  };

  moderator = () => {
    const { mod_new_post } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Moderator
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            New Post
          </Header>
          <ReactQuill
            value={mod_new_post}
            modules={{ toolbar }}
            onChange={(value) =>
              this.handleChange(value, 'mod_new_post')
            }
          />
          <Divider hidden />
          <StyledButton
            backgroundColor={this.props.buttonColor}
            fontColor={this.props.fontColor}
            border={this.props.borderColor}
            floated="right">
            Submit All Changes
          </StyledButton>
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
              {this.moderator()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    mod_new_post,
    id,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    mod_new_post,
    id,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};

export default connect(mapStateToProps)(ModeratorForm);
