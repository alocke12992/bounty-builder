import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Container, Grid, Segment, Form } from 'semantic-ui-react';
import SocialMediaRules from './SocialMediaRules';
import BlogRules from './BlogRules';
import ChatRules from './ChatRules';
import { withRouter } from 'react-router-dom';
import Submissions from './Submissions';

class Social extends React.Component {
  state = { value: '' }

  componentDidMount() {
    axios.get(`/api/${this.props.service}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ value: res.data });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    axios.post(`/api/${this.props.service}`, { [`${this.props.service}`]: value } )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch( err => {
        //TODO
      })
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  rules = () => {
    const { pathname } = this.props.location;
    if(['/facebook', '/twitter', '/linkedin'].includes(pathname)){
      return <SocialMediaRules/>;
    } else if (['/reddit', '/blog', '/influencer'].includes(pathname)){
      return <BlogRules/>;
    } else if (['/telegram', '/discord'].includes(pathname)){
      return <ChatRules/>
    }
  }

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    value={value === null ? '' : value}
                    onChange={this.handleChange}
                    required
                    placeholder="Username"
                  />
                  <Form.Button>Save</Form.Button>
                </Form>
              </Segment>
              { this.props.submissions &&
                <Submissions kind={this.props.service}/>
              }
            </Grid.Column>
            <Grid.Column>
              {
                this.rules()
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(connect()(Social));
