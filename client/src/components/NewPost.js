import React, { Component } from 'react';
import { Container, Form, Segment, Select, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

const options = [
  { key: 'facebook', text: 'Facebook', value: 'facebook' },
  { key: 'twitter', text: 'Twitter', value: 'twitter' },
  { key: 'linkedin', text: 'LinkedIn', value: 'linkedin' },
  { key: 'reddit', text: 'Reddit', value: 'reddit' }
]

class NewPost extends Component {
  state = { url: '', kind: ''}

  handleChange = (e) => {
    this.setState({ url: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { url, kind } = this.state;
    axios.post('/api/posts', { url, kind } )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('New Post Made Successfully', 'green'));
        this.props.history.push('/');
      })
      .catch( err => {
        //TODO
      })
  }

  render() {
    const { url, kind } = this.state;
    return (
      <Container>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={url}
              onChange={this.handleChange}
              required
              placeholder="URL to new post MUST start with http"
            />
          <Form.Field required control={Select} label='Service' options={options} placeholder='Service' onChange={(e, value)=> this.setState({kind: value.value})}/>
          <Form.Button disabled={url === '' || kind === ''}>Save</Form.Button>
          </Form>
          <Divider />
          <p>How to copy URLS from Facebook, Twitter, LinkedIn, Reddit</p>
          <p>Facebook: On your wall, click the timestamp on the top of your facebook post. This will take you to a new url. Copy the url on the top of the browser. For example, 'https://www.facebook.com/SimplyVitalHealth/posts/175276439751750'.</p>
          <p>Twitter: Click the small dropdown on the top right hand corner of your tweet. Select 'Copy Link to Tweet'. For example, 'https://twitter.com/SimplyVitalHQ/status/956332381358776320'</p>
          <p>LinkedIn: On the top right hand corner of post use the drop down and select copy link to post.</p>
          <p>Reddit: On your post, click the share button and then copy Link.</p>
        </Segment>
      </Container>
    );
  }
}

export default connect()(NewPost);
