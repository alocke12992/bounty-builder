import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { Card, Progress } from 'semantic-ui-react';

class TotalUsersTile extends React.Component {
  state = { users: 0, progress: 0 }

  componentDidMount() {
    axios.get('/api/users/total_user_count')
      .then( res => {
        this.setState({users: res.data}, () => this.barLogic());
        this.props.dispatch(setHeaders(res.headers));
      });
  }

  barLogic = () => {
    const { users } = this.state;
    if(users <= 500){
      this.setState({progress: (users / 500) * 100});
    } else if ( users >= 501 && users <= 1000){
      this.setState({progress: (users / 1000) * 100});
    } else if ( users >= 1001 && users <= 2000){
      this.setState({progress: (users / 2000) * 100});
    } else if (users >= 2001){
      this.setState({progress: 100});
    }
  }

  render() {
    const { progress } = this.state;
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Number of Users
          </Card.Header>
          <Card.Description>
            <strong>{this.state.users}</strong>
          </Card.Description>
          <Progress percent={progress} indicating />
          <ul>
            <li>0-500 users will release 500,000 of the total token allocation</li>
            <li>501- 1000 users will release 1,000,000</li>
            <li>Over 2000 users on the bounty will release 2,000,000</li>
          </ul>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(TotalUsersTile);
