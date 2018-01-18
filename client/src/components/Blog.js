import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Container, Grid, Segment, Form, Card, Button } from 'semantic-ui-react';
import SocialMediaRules from './SocialMediaRules';
import BlogRules from './BlogRules';
import ChatRules from './ChatRules';
import { withRouter } from 'react-router-dom';
import { getBlogs, addBlog } from '../actions/blogs';

class Blog extends React.Component {
  state = { username: '', newBlogURL: '', adding: false }

  componentWillMount() {
    this.props.dispatch(getBlogs());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = this.state;
    axios.post(`/api/${this.props.service}`, { [`${this.props.service}`]: username } )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Success', 'green'));
      })
      .catch( err => {
        //TODO
      })
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: e.target.value });
  }

  handleNewSubmit = (e) => {
    e.preventDefault();
    const { newBlogURL } = this.state;
    this.props.dispatch(addBlog(newBlogURL));
    this.setState({newBlogURL: '', adding: false})
  }

  renderBlogs = () => {
    return this.props.blogs.map(blog => (
      <Card>
        <Card.Content>
          <Card.Header>
            { blog.url }
          </Card.Header>
          <Card.Description>
            Status: { blog.accepted ? 'Accepted' : 'In Review'}
          </Card.Description>
        </Card.Content>
      </Card>
    ));
  }

  toggleAdding = () => {
    this.setState({adding: !this.state.adding});
  }

  render() {
    const { value, adding } = this.state;

    return (
      <Container>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    value={value === null ? '' : value}
                    onChange={(e,input) => this.handleChange(e,input)}
                    required
                    placeholder="Username"
                    name={'username'}
                  />
                  <Form.Button>Save</Form.Button>
                </Form>
              </Segment>
              <Segment>
                { adding ?
                  <Form onSubmit={this.handleNewSubmit}>
                    <Form.Input
                      value={value === null ? '' : value}
                      onChange={(e,input) => this.handleChange(e,input)}
                      required
                      placeholder="URL to your blog post"
                      name={'newBlogURL'}
                      />
                    <Form.Button>Add</Form.Button>
                    <Button onClick={this.toggleAdding}>Cancel</Button>
                  </Form>
                  :
                  <Button onClick={this.toggleAdding}>Add New Submission</Button>
                }
              </Segment>
              { this.renderBlogs() }
            </Grid.Column>
            <Grid.Column>
              <BlogRules/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default withRouter(connect(mapStateToProps)(Blog));
