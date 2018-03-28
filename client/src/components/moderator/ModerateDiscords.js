import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../../actions/flash';
import { setHeaders } from '../../actions/headers';
import { Button, Divider, Input, Table, } from 'semantic-ui-react';

class ModerateDiscords extends React.Component {
  state = { discords: [] };

  componentDidMount() {
    axios.get('/api/moderator/get_pending_discords')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ discords: res.data});
      });
  };

  confirmReward = (id) => {
    axios.post('/api/moderator/approve_discord', { id })
      .then(res => {
        let discords = this.state.discords.filter(r => r.id !== id);
        this.setState({ discords })
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Approved', 'green'));
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  rejectSubmission = (id) => {
    axios.post('/api/moderator/reject_discord', { id })
      .then(res => {
        let discords = this.state.discords.filter(r => r.id !== id);
        this.setState({ discords })
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Discord Rejected', 'green'));
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  renderRows = () => {
    return this.state.discords.map( discord => {
      return(
        <Table.Row key={discord.id}>
          <Table.Cell>{discord.username}</Table.Cell>
          <Table.Cell>
            <Button
              color='green'
              onClick={() => this.confirmReward(discord.id)}
            >
              Confirm
            </Button>
            <Divider hidden />
            <Button
              color='red'
              onClick={() => this.rejectSubmission(discord.id)}
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

export default connect()(ModerateDiscords);
