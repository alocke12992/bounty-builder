import React from 'react';
import axios from 'axios';
import GenerateHtml from './GenerateHtml'
import StyledButton from '../styledcomponents/StyledButton';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {setHeaders} from '../actions/headers';
import {withRouter} from 'react-router-dom';
import {Container, Grid, Segment, } from 'semantic-ui-react';

class VideoContest extends React.Component {
  state = {value: ''};

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then(res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({value: res.data});
      });
  };

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {value} = this.state;
    axios.post(`/api/${this.props.service}`, {[`${this.props.service}`]: value})
      .then(res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  render() {
    const { video_link } = this.props
    return (
      <Container>
        <Grid stackable columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <div>
                  <GenerateHtml text={this.props.settings.video_rules} />
                </div>
                <StyledButton
                  backgroundColor={this.props.buttonColor}
                  fontColor={this.props.fontColor}
                  border={this.props.borderColor}
                  target='_blank'
                  href={`${video_link}`}
                  fluid
                  style={styles.enter}
                > 
                  Enter Video Contest
                </StyledButton>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
};
const styles = {
  enter: {
    marginTop: '15px',
  },
};


const mapStateToProps = (state) => {
  const {
    theme_button_color,
    theme_button_font_color,
    theme_button_border_color,
    video_link,
  } = state.settings;
  return {
    settings: state.settings,
    user: state.user,
    buttonColor: theme_button_color,
    fontColor: theme_button_font_color,
    borderColor: theme_button_border_color,
    video_link,
  }
};

export default withRouter(connect(mapStateToProps)(VideoContest));
