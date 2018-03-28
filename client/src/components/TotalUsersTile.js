import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { Card, Progress } from 'semantic-ui-react';

class TotalUsersTile extends React.Component {
  state = { progress: 0, users: 0, };

  componentDidMount() {
    axios.get('/api/users/total_user_count')
      .then( res => {
        this.setState({users: res.data}, () => this.barLogic());
        this.props.dispatch(setHeaders(res.headers));
      });
  };

  barLogic = () => {
    const { users } = this.state;
    if(users <= 2500){
      this.setState({progress: (users / 2500) * 100});
    } else if ( users >= 2501 && users <= 5000){
      this.setState({progress: (users / 5000) * 100});
    } else if ( users >= 5001 && users <= 10000){
      this.setState({progress: (users / 10000) * 100});
    } else if (users >= 10000){
      this.setState({progress: 100});
    }
  };

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
            <li>0 - 2,500 users will release 1,000,000 of the total token allocation</li>
            <li>2,501 - 5,000 users will release 2,500,000 tokens</li>
            <li>5,001 - 10,000 users will release 5,000,000 tokens</li>
            <li>Over 10,000 users on the bounty will release 7,500,000 tokens</li>
          </ul>
        </Card.Content>
      </Card>
    )
  }
};

export default connect()(TotalUsersTile);
