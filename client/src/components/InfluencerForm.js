import React from 'react';
import ReactQuill from 'react-quill';
import StyledButton from '../styledcomponents/StyledButton';
import {setFlash} from '../actions/flash';
import {toolbar} from './Settings';
import {updateSettings} from '../actions/settings';
import {
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
} from 'semantic-ui-react';
import {connect} from 'react-redux';

class InfluencerForm extends React.Component {
  state = {
    infl_submission: '',
    infl_bounties: '',
    infl_link: '',
  };

  componentDidMount() {
    this.setState({...this.props});
  }

  toggleInfluencer = () => {
    this.setState({ infl_show: !this.state.infl_show });
  };

  handleChange = (value, name) => {
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const influencer = {...this.state};
    const {dispatch} = this.props;
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
      infl_show,
    } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Influencer
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            Enable Influencer
          </Header>
          <Form.Field
              checked={infl_show === true}
              control={Checkbox}
              label="Yes"
              onChange={this.toggleInfluencer}
          />
          <Divider />
          <Form.Field>
            <Header as="h4" color="blue">
              Submission
            </Header>
            <ReactQuill
              value={infl_submission}
              modules={{toolbar}}
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
              Bounties
            </Header>
            <ReactQuill
              value={infl_bounties}
              modules={{toolbar}}
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
            <Form.Input
              value={infl_link}
              onChange={(e) =>
                this.handleChange(
                  e.target.value,
                  'infl_link',
                )
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
    infl_show,
    id,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    infl_submission,
    infl_bounties,
    infl_link,
    infl_show,
    id,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};

export default connect(mapStateToProps)(InfluencerForm);
