import React  from 'react';
import axios from 'axios';
import GenerateHtml from '../GenerateHtml'
import { connect } from 'react-redux';
import { setFlash } from '../../actions/flash';
import { setHeaders } from '../../actions/headers';
import { Container, Divider, Form, Segment, Select, } from 'semantic-ui-react';

class ModerateNewPost extends React.Component {
  state = { kind: '', url: '', };

  handleChange = (e) => {
    this.setState({ url: e.target.value });
  };

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
  };

  render() {
    const { url, kind } = this.state;
    const { mod_new_post } = this.props;

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
          <GenerateHtml text={ mod_new_post } />
        </Segment>
      </Container>
    );
  }
};

const options = [
  { key: 'facebook', text: 'Facebook', value: 'facebook' },
  { key: 'twitter', text: 'Twitter', value: 'twitter' },
  { key: 'linkedin', text: 'LinkedIn', value: 'linkedin' },
  { key: 'reddit', text: 'Reddit', value: 'reddit' }
];

const mapStateToProps = (state) => {
  return (
    { mod_new_post: state.settings.mod_new_post }
  )
}
export default connect(mapStateToProps)(ModerateNewPost);
