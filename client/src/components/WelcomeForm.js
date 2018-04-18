
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

class welcomeForm extends React.Component {
  state = { welc_body: '' };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const welcome = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(welcome));
    dispatch(
      setFlash(
        'Your changes to Welcome page have been submitted and saved.',
        'blue',
      ),
    );
  };

  welcome = () => {
    const { welc_body } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Welcome
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            New Post
          </Header>
          <ReactQuill
            value={welc_body}
            modules={{ toolbar }}
            onChange={(value) =>
              this.handleChange(value, 'welc_body')
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
              {this.welcome()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    welc_body,
    id,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    welc_body,
    id,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};

export default connect(mapStateToProps)(welcomeForm);
