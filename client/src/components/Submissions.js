import React from 'react';
import { connect } from 'react-redux';
import { Card, Segment, Form, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { getSubmissions, addSubmission } from '../actions/submissions';


const truncate = (string) => {
  if(string.length >= 30){
    return string.substring(0,30) + '...';
  }else{
    return string;
  }
}

class Submissions extends React.Component {
  state = { username: '', newSubmission: '', adding: false }

  componentWillMount() {
    this.props.dispatch(getSubmissions(this.props.kind));
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: e.target.value });
  }

  handleNewSubmit = (e) => {
    e.preventDefault();
    const { newSubmission } = this.state;
    this.props.dispatch(addSubmission(newSubmission, this.props.kind));
    this.setState({newBlogURL: '', adding: false})
  }

  renderSubmissions = () => {
    return this.props.submissions.map(submission => (
      <Card key={submission.id}>
        <Card.Content>
          <Card.Header>
            <a href={submission.url}>{ truncate(submission.url) }</a>
          </Card.Header>
          <Card.Description>
            Status: { submission.accepted ? 'Accepted' : 'In Review'}
          </Card.Description>
        </Card.Content>
      </Card>
    ));
  }

  toggleAdding = () => {
    this.setState({adding: !this.state.adding});
  }

  render() {
    const { adding } = this.state;
    return (
      <div>
        <Segment>
          { adding ?
            <Form onSubmit={this.handleNewSubmit}>
              <Form.Input
                onChange={(e,input) => this.handleChange(e,input)}
                required
                placeholder="URL to your new submission"
                name={'newSubmission'}
                />
              <Form.Button>Add</Form.Button>
              <Button onClick={this.toggleAdding}>Cancel</Button>
            </Form>
            :
            <Button onClick={this.toggleAdding}>Add New Submission</Button>
          }
        </Segment>
        { this.renderSubmissions() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    submissions: state.submissions,
  }
}

export default withRouter(connect(mapStateToProps)(Submissions));
