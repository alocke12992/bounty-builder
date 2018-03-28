import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../../actions/flash';
import { setHeaders } from '../../actions/headers';
import { Button, Divider, Input, Table, } from 'semantic-ui-react';

class ModerateTelegrams extends React.Component {
  state = { telegrams: [] };

  componentDidMount() {
    axios.get('/api/moderator/get_pending_telegrams')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ telegrams: res.data});
      });
  };

  confirmReward = (id) => {
    axios.post('/api/moderator/approve_telegram', { id })
      .then(res => {
        let telegrams = this.state.telegrams.filter(r => r.id !== id);
        this.setState({ telegrams })
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Approved', 'green'));
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  rejectSubmission = (id) => {
    axios.post('/api/moderator/reject_telegram', { id })
      .then(res => {
        let telegrams = this.state.telegrams.filter(r => r.id !== id);
        this.setState({ telegrams })
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Telegram Rejected', 'green'));
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

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
  };

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
