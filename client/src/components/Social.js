import React from 'react';
import axios from 'axios';
import BlogRules from './BlogRules';
import ChatRules from './ChatRules';
import GenerateHtml from './GenerateHtml';
import SocialMediaRules from './SocialMediaRules';
import StyledButton from '../styledcomponents/StyledButton';
import Submissions from './Submissions';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {setHeaders} from '../actions/headers';
import {withRouter} from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class Social extends React.Component {
  componentDidMount() {
    axios
      .get(`/api/${this.props.service}`)
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({value: res.data});
      });
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {value} = this.state;
    axios
      .post(`/api/${this.props.service}`, {
        [`${this.props.service}`]: value,
      })
      .then((res) => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch((err) => {
        this.props.dispatch(setHeaders(err.headers));
      });
  };

  render() {
    const {
      infl_submission,
      infl_bounties,
      infl_link,
    } = this.props;

    // infl_link is currently not being used but can be easily implemented in for a button link.
    return (
      <Container>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <GenerateHtml text={infl_submission} />
              </Segment>
              <Segment>
                {this.props.user.is_influencer ? (
                  <div>
                    <p>
                      You have been approved to submit
                      influencer posts.
                    </p>
                  </div>
                ) : (
                    <div>
                      <StyledButton
                        backgroundColor={this.props.buttonColor}
                        fontColor={this.props.fontColor}
                        border={this.props.borderColor}
                        target="_blank"
                        href="https://goo.gl/forms/QCQzNDqgoCtO0QeS2"
                      >
                        Submit Social Media Account
                    </StyledButton>
                      <p>
                        If you are approved to generate, you
                        will be contacted by social media.
                    </p>
                    </div>
                  )}
              </Segment>
              {this.props.user.is_influencer && (
                <Submissions kind="influencer" />
              )}
              <BlogRules />
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
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
  } = state.settings;
  const {user} = state;

  return {
    infl_submission,
    infl_bounties,
    infl_link,
    user,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
  };
};

export default withRouter(
  connect(mapStateToProps)(Social),
);
