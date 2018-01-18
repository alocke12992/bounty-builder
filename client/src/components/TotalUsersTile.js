import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { Card } from 'semantic-ui-react';

class TotalUsersTile extends React.Component {
  state = { users: 0 }

  componentDidMount() {
    axios.get('/api/users/total_user_count')
      .then( res => {
        this.setState({users: res.data})
        this.props.dispatch(setHeaders(res.headers));
      });
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Number of Users
          </Card.Header>
          <Card.Description>
            <strong>{this.state.users}</strong>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(TotalUsersTile);
