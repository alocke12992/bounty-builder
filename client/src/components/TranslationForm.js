import React from 'react';
import ReactQuill from 'react-quill';
import StyledButton from '../styledcomponents/StyledButton';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { toolbar } from './Settings';
import { updateSettings } from '../actions/settings';
import {
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
} from 'semantic-ui-react';

class TranslationForm extends React.Component {
  state = {
    trans_rules: '',
    trans_link: '',
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  toggleTranslation = () => {
    this.setState({ trans_show: !this.state.trans_show });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const translation = { ...this.state };
    const { dispatch } = this.props;
    dispatch(updateSettings(translation));
    dispatch(
      setFlash(
        'Your changes to Translation have been submitted and saved.',
        'blue',
      ),
    );
  };

  translation = () => {
    const {
      trans_rules,
      trans_link,
      trans_show,
    } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Translation
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            Enable Translation
          </Header>
          <Form.Field
            checked={trans_show === true}
            control={Checkbox}
            label="Yes"
            onChange={this.toggleTranslation}
          />
          <Divider />
          <Form.Field>
            <Header as="h4" color="blue">
              Rules
            </Header>
            <ReactQuill
              value={trans_rules}
              modules={{ toolbar }}
              onChange={(value) =>
                this.handleChange(value, 'trans_rules')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Link
            </Header>
            <Form.Input
              value={trans_link}
              onChange={(e) =>
                this.handleChange(
                  e.target.value,
                  'trans_link',
                )
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
          </Form.Field>
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
              {this.translation()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    trans_rules,
    trans_link,
    trans_show,
    id,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    trans_rules,
    trans_link,
    trans_show,
    id,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};

export default connect(mapStateToProps)(TranslationForm);
