import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../../actions/flash';
import { setHeaders } from '../../actions/headers';
import styled from 'styled-components'
import { Button, Divider, Input, Table, Loader } from 'semantic-ui-react';

class ModerateTelegrams extends React.Component {
  state = { telegrams: [], loading: true };

  componentDidMount() {
    axios.get('/api/moderator/get_pending_telegrams')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ telegrams: res.data});
      });
    this.setState({ loading: false })
  };

  filterState = (response, id) => {
    let telegrams = this.state.telegrams.filter(response => response.id !== id);
    this.setState({ telegrams })
    this.props.dispatch(setHeaders(response.headers));
  }

  confirmReward = (id) => {
    axios.post('/api/moderator/approve_telegram', { id })
      .then(res => {
        this.filterState(res, id)
        this.props.dispatch(setFlash('Approved', 'green'));
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  approveAll = () => {
    const { telegrams, loading } = this.state
    const { dispatch } = this.props
    this.setState({ loading: true })
    axios.post('/api/moderator/approve_all_telegrams')
      .then( res => {
        res.data ?
          this.setState({ telegrams: res.data, loading: false })
        :
          this.setState({ telegrams: [], loading: false })
        dispatch(setHeaders(res.headers))
        dispatch(setFlash('All Pending Telegrams Approved', 'green'))
      })
      .catch(err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  }

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
    const { loading, telegrams } = this.state
    return(
      loading ?
        <Loader active size="massive">This may take longer depending on the number of pending Telegrams.</Loader>
      :
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
            { 
              telegrams.length > 0 && 
                <Divider>
                  <Button onClick={this.approveAll}>
                    Approve All
                  </Button>
                </Divider>
            }
          </Table.Header>
          <Table.Body>
            { this.renderRows() }
          </Table.Body>
        </Table>
    )
  }
}

export default connect()(ModerateTelegrams);
