import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { setHeaders } from '../../actions/headers';
import { setFlash } from '../../actions/flash';

class ModerateTelegrams extends Component {
  state = { telegrams: [] }

  componentDidMount() {
    axios.get('/api/moderator/get_pending_telegrams')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ telegrams: res.data});
      });
  }

  renderRows = () => {
    return this.state.telegrams.map( telegram => {
      return(
        <Table.Row key={telegram.id}>
          <Table.Cell>{telegram.username}</Table.Cell>
          <Table.Cell>
            <Button
              color='green'
              onClick={() => this.confirmReward(telegram.id)}
            >
              Confirm
            </Button>
            <Divider hidden />
            <Button
              color='red'
              onClick={() => this.rejectSubmission(telegram.id)}
            >
              Reject
            </Button>
          </Table.Cell>
        </Table.Row>
      )
    });
  }

  confirmReward = (id) => {
    axios.post('/api/moderator/approve_telegram', { id } )
      .then( res => {
        let telegrams = this.state.telegrams.filter( r => r.id !== id );
        this.setState({telegrams})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Approved', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  }

  rejectSubmission = (id) => {
    axios.post('/api/moderator/reject_telegram', { id } )
      .then( res => {
        let telegrams = this.state.telegrams.filter( r => r.id !== id );
        this.setState({telegrams})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Telegram Rejected', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  }


  render(){
    return(
      <Table stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
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

export default connect()(ModerateTelegrams);
