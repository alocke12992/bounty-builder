import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { setHeaders } from '../../actions/headers';
import { setFlash } from '../../actions/flash';

class ModerateRewards extends Component {
  state = { rewards: [] }

  componentDidMount() {
    axios.get('/api/moderator/get_pending_rewards')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ rewards: res.data.rewards});
      });
  }

  renderRows = () => {
    return this.state.rewards.map( reward => (
      <Table.Row key={reward.id}>
        <Table.Cell>{reward.name}</Table.Cell>
        <Table.Cell><a href={reward.url} target='_balnk'>{reward.url}</a></Table.Cell>
        <Table.Cell>{reward.reason}</Table.Cell>
        <Table.Cell>
          <Button color='green' onClick={() => this.confirmReward(reward.id)}>Confirm</Button>
          <Divider hidden />
          <Button color='red'>Block User</Button>
        </Table.Cell>
      </Table.Row>
    ))
  }

  confirmReward = (id) => {
    axios.post('/api/moderator/approve_reward', { id } )
      .then( res => {
        let rewards = this.state.rewards.filter( r => r.id !== id );
        this.setState({rewards})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Approved', 'green'));
      })
      .catch( err => {
        //TODO
      })
  }

  blockUser = (id, rewardId) => {
    axios.post('/api/moderator/block_user', { id } )
      .then( res => {
        let rewards = this.state.rewards.filter( r => r.id !== rewardId );
        this.setState({rewards})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('User Blocked', 'green'));
      })
      .catch( err => {
        //TODO
      })
  }

  render(){
    return(
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Url</Table.HeaderCell>
            <Table.HeaderCell>Reason</Table.HeaderCell>
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

export default connect()(ModerateRewards);
