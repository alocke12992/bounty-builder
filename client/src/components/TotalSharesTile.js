import React from 'react';
import { connect } from 'react-redux';
import { Card, Progress } from 'semantic-ui-react';

class TotalSharesTile extends React.Component {
  state = { shares: '0', progress: 0 }

  componentDidMount() {
    this.getPoints(this.props.rewards);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.rewards !== this.props.rewards){
      this.getPoints(nextProps.rewards);
    }
  }

  getPoints = (rewards = []) => {
    var sum = 0;
    var arrayLength = rewards.length;
    for (var i = 0; i < arrayLength; i++) {
      sum = sum + rewards[i].value;
    }
    this.setState({shares: sum})
  }

  barLogic = () => {
    const { shares } = this.state;
    if(shares <= 150){
      this.setState({progress: (shares / 150) * 100});
    } else if ( shares >= 151 && shares <= 500){
      this.setState({progress: (shares / 1000) * 100});
    } else if ( shares >= 501 && shares <= 1000){
      this.setState({progress: (shares / 2000) * 100});
    } else if (shares >= 1001){
      this.setState({progress: 100});
    }
  }

  render() {
    const { progress } = this.state;
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Number of Shares
          </Card.Header>
          <Card.Description>
            <strong>{this.state.shares}</strong>
          </Card.Description>
          <Progress percent={progress} indicating />
          <ul>
            <li>0-150 Shares: 10% of the total bounty pool</li>
            <li>151-500: 20% of total bounty pool</li>
            <li>501-1000: 30% of total bounty pool</li>
            <li>Over 1000 shares: 40% of the total bounty pool</li>
          </ul>
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

export default connect(mapStateToProps)(TotalSharesTile);
