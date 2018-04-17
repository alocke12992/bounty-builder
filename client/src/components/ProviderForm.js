import React from 'react';
import ReactQuill from 'react-quill';
import StyledButton from '../styledcomponents/StyledButton';
import {setFlash} from '../actions/flash';
import {toolbar} from './Settings';
import {updateSettings} from '../actions/settings';
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
import {connect} from 'react-redux';

class ProviderForm extends React.Component {
  state = {
    prov_social_media: '',
    prov_action_warning: '',
    prov_facebook_link: '',
    prov_twitter_link: '',
    prov_linkedin_link: '',
    prov_reddit_link: '',
  };

  componentDidMount() {
    this.setState({...this.props});
  }

  toggleFacebook = () => {
    this.setState({prov_facebook: !this.state.prov_facebook});
  };

  toggleTwitter = () => {
    this.setState({prov_twitter: !this.state.prov_twitter});
  };

  toggleLinkedIn = () => {
    this.setState({prov_linkedin: !this.state.prov_linkedin});
  };

  toggleReddit = () => {
    this.setState({prov_reddit: !this.state.prov_reddit});
  };

  handleChange = (value, name) => {
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const provider = {...this.state};
    const {dispatch} = this.props;
    dispatch(updateSettings(provider));
    dispatch(
      setFlash(
        'Your changes to Provider have been submitted and saved.',
        'blue',
      ),
    );
  };

  provider = () => {
    const {
      prov_social_media,
      prov_action_warning,
      prov_facebook,
      prov_facebook_link,
      prov_twitter,
      prov_twitter_link,
      prov_linkedin,
      prov_linkedin_link,
      prov_reddit,
      prov_reddit_link,
    } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue" textAlign="center">
          Provider
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h4" color="blue">
            Enable Providers
          </Header>
          <Form.Group inline>
            <Form.Field
              checked={prov_facebook === true}
              control={Checkbox}
              label="Facebook"
              onChange={this.toggleFacebook}
            />
            <Form.Field
              checked={prov_twitter === true}
              control={Checkbox}
              label="Twitter"
              onChange={this.toggleTwitter}
            />
            <Form.Field
              checked={prov_linkedin === true}
              control={Checkbox}
              label="LinkedIn"
              onChange={this.toggleLinkedIn}
            />
            <Form.Field
              checked={prov_reddit === true}
              control={Checkbox}
              label="Reddit"
              onChange={this.toggleReddit}
            />
          </Form.Group>
          <Divider />
          <Form.Field>
            <Header as="h4" color="blue">
              Social Media
            </Header>
            <ReactQuill
              value={prov_social_media}
              modules={{toolbar}}
              onChange={(value) =>
                this.handleChange(
                  value,
                  'prov_social_media',
                )
              }
            />
            <Divider hidden />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Action Warning
            </Header>
            <ReactQuill
              value={prov_action_warning}
              modules={{toolbar}}
              onChange={(value) =>
                this.handleChange(value, 'prov_action_warning')
              }
            />
            <Divider hidden />
          </Form.Field>
          <Divider hidden />
          <Form.Field>
            <Header as="h4" color="blue">
              Facebook Link
            </Header>
            <Form.Input 
              value={prov_facebook_link}
              onChange={(e) =>
                this.handleChange(e.target.value, 'prov_facebook_link')
              }
              placeholder="Facebook URL goes here"
            />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Twitter Link
            </Header>
            <Form.Input 
              value={prov_twitter_link}
              onChange={(e) =>
                this.handleChange(e.target.value, 'prov_twitter_link')
              }
              placeholder="Twitter URL goes here"
            />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              LinkedIn Link
            </Header>
            <Form.Input 
              value={prov_linkedin_link}
              onChange={(e) =>
                this.handleChange(e.target.value, 'prov_linkedin_link')
              }
              placeholder="LinkedIn URL goes here"
            />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="blue">
              Reddit Link
            </Header>
            <Form.Input 
              value={prov_reddit_link}
              onChange={(e) =>
                this.handleChange(e.target.value, 'prov_reddit_link')
              }
              placeholder="Reddit URL goes here"
            />
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
              {this.provider()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    prov_social_media,
    prov_action_warning,
    prov_facebook,
    prov_facebook_link,
    prov_twitter,
    prov_twitter_link,
    prov_linkedin,
    prov_linkedin_link,
    prov_reddit,
    prov_reddit_link,
    id,
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  return {
    prov_social_media,
    prov_action_warning,
    prov_facebook,
    prov_facebook_link,
    prov_twitter,
    prov_twitter_link,
    prov_linkedin,
    prov_linkedin_link,
    prov_reddit,
    prov_reddit_link,
    id,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};
export default connect(mapStateToProps)(ProviderForm);
