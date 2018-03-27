import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { setHeaders } from '../../actions/headers';
import { setFlash } from '../../actions/flash';

class ModerateRewards extends Component {
  state = { rewards: [], page: 1, totalPages: 0 }

  componentDidMount() {
    axios.get(`/api/moderator/get_pending_rewards?page=${this.state.page}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ rewards: res.data.rewards, totalPages: res.data.total_pages});
      });
  }

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/moderator/get_pending_rewards?page=${page}`)
      .then( res => {
        this.setState( state => {
          return { rewards: [...state.rewards, ...res.data.rewards], page: state.page + 1 }
        })
        this.props.dispatch(setHeaders(res.headers));
      })
  }

  renderRows = () => {
    return this.state.rewards.map( reward => (
      <Table.Row key={reward.id}>
        <Table.Cell collapsing>{reward.name}</Table.Cell>
        <Table.Cell collapsing><a href={reward.url} target='_blank'>Go to page.</a></Table.Cell>
        <Table.Cell>{reward.reason}</Table.Cell>
        <Table.Cell>
          <Button color='green' onClick={() => this.confirmReward(reward.id)}>Confirm</Button>
          <Divider hidden />
          <Button color='red' onClick={() => this.revokeReward(reward.id)}>Revoke</Button>
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
        this.props.dispatch(setHeaders(err.headers));
      })
  }

  revokeReward = (id) => {
    axios.post('/api/moderator/revoke_reward', { id } )
      .then( res => {
        let rewards = this.state.rewards.filter( r => r.id !== id );
        this.setState({rewards})
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Reward Revoked', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
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
    let { page, totalPages } = this.state;
    return(
      <div>
        <Table stackable>
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
        <Button fluid onClick={this.loadMore} disabled={page === totalPages}>Load More</Button>
      </div>
    )
  }
}

export default connect()(ModerateRewards);
