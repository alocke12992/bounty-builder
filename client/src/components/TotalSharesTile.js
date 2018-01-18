import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { Card } from 'semantic-ui-react';

class TotalSharesTile extends React.Component {
  state = { shares: 0 }

  componentDidMount() {
    axios.get('/api/rewards')
      .then( res => {
        this.setState({shares: res.data})
        this.props.dispatch(setHeaders(res.headers));
      });
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Number of Shares
          </Card.Header>
          <Card.Description>
            <strong>{this.state.shares}</strong>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(TotalSharesTile);
