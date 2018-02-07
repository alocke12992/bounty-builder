import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Divider, Input } from 'semantic-ui-react';
import axios from 'axios';
import { setHeaders } from '../../actions/headers';
import { setFlash } from '../../actions/flash';

class ModerateSubmissions extends Component {
  state = { submissions: [], reward: '' }

  componentDidMount() {
    axios.get('/api/moderator/get_pending_submissions')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ submissions: res.data});
      });
  }

  renderRows = () => {
    return this.state.submissions.map( submission => {
      let reward = this.state['reward' + submission.id] == null ? '' : this.state['reward' + submission.id];
      return(
        <Table.Row key={submission.id}>
          <Table.Cell>{submission.kind}</Table.Cell>
          <Table.Cell><a href={submission.url} target='_blank'>{submission.url}</a></Table.Cell>
          <Table.Cell><Input value={reward} onChange={(e) => this.handleChange(e,submission.id)}/></Table.Cell>
          <Table.Cell>
            <Button
              color='green'
              disabled={isNaN(reward) || reward == null || reward === ''}
              onClick={() => this.confirmReward(submission.id, reward)}
            >
              Confirm
            </Button>
            <Divider hidden />
            <Button
              color='red'
              onClick={() => this.rejectSubmission(submission.id)}
            >
              Reject
            </Button>
          </Table.Cell>
        </Table.Row>
      )
    });
  }


  handleChange = (e, id) => {
    this.setState({ [ 'reward' + id]: e.target.value });
  }

  confirmReward = (id, reward) => {
    axios.post('/api/moderator/approve_submission', { id, reward } )
      .then( res => {
        let submissions = this.state.submissions.filter( r => r.id !== id );
        this.setState({submissions})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Approved', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  }

  rejectSubmission = (id) => {
    axios.post('/api/moderator/reject_submission', { id } )
      .then( res => {
        let submissions = this.state.submissions.filter( r => r.id !== id );
        this.setState({submissions})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Submission Rejected', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  }


  render(){
    return(
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kind</Table.HeaderCell>
            <Table.HeaderCell>Url</Table.HeaderCell>
            <Table.HeaderCell>Reward Amount</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { this.renderRows() }
        </Table.Body>
      </Table>
    )
  }
}

export default connect()(ModerateSubmissions);
