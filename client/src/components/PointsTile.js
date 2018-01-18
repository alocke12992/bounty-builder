import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { Card } from 'semantic-ui-react';

class PointsTile extends React.Component {
  state = { points: 0 }

  componentDidMount() {
    axios.get(`/api/rewards/source_points?source=${this.props.source}`)
      .then( res => {
        this.setState({points: res.data})
        this.props.dispatch(setHeaders(res.headers));
      });
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {this.props.title}
          </Card.Header>
          <Card.Description>
            <strong>{this.state.points}</strong>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(PointsTile);
