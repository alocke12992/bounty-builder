import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { setHeaders } from '../../actions/headers';
import { setFlash } from '../../actions/flash';

class ModerateDiscords extends Component {
  state = { discords: [] }

  componentDidMount() {
    axios.get('/api/moderator/get_pending_discords')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ discords: res.data});
      });
  }

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
  }

  confirmReward = (id) => {
    axios.post('/api/moderator/approve_discord', { id } )
      .then( res => {
        let discords = this.state.discords.filter( r => r.id !== id );
        this.setState({discords})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Approved', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  }

  rejectSubmission = (id) => {
    axios.post('/api/moderator/reject_discord', { id } )
      .then( res => {
        let discords = this.state.discords.filter( r => r.id !== id );
        this.setState({discords})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Discord Rejected', 'green'));
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

export default connect()(ModerateDiscords);
