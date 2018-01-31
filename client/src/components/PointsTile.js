import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

class PointsTile extends React.Component {
  state = { points: '0' }

  componentWillMount() {
    this.getPoints(this.props.rewards);
  }

  getPoints = (rewards = []) => {
    var sum = 0;
    var arrayLength = rewards.length;
    for (var i = 0; i < arrayLength; i++) {
      if(rewards[i].source === this.props.source){
        sum = sum + rewards[i].value;
      }
    }
    this.setState({points: sum})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.rewards !== this.props.rewards){
      this.getPoints(nextProps.rewards);
    }
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

const mapStateToProps = (state) => {
  return {
    rewards: state.rewards
  }
}

export default connect(mapStateToProps)(PointsTile);
