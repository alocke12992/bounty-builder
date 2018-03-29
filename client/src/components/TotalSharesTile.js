import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Container,
  Progress,
} from 'semantic-ui-react';

class TotalSharesTile extends React.Component {
  state = { shares: '0', progress: 0 };

  componentDidMount() {
    this.getPoints(this.props.rewards);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rewards !== this.props.rewards) {
      this.getPoints(nextProps.rewards);
    }
  }

  getPoints = (rewards = []) => {
    var sum = 0;
    var arrayLength = rewards.length;
    for (var i = 0; i < arrayLength; i++) {
      sum = sum + rewards[i].value;
    }
    this.setState({ shares: sum });
  };

  barLogic = () => {
    const { shares } = this.state;
    if (shares <= 150) {
      this.setState({ progress: shares / 150 * 100 });
    } else if (shares >= 151 && shares <= 500) {
      this.setState({ progress: shares / 1000 * 100 });
    } else if (shares >= 501 && shares <= 1000) {
      this.setState({ progress: shares / 2000 * 100 });
    } else if (shares >= 1001) {
      this.setState({ progress: 100 });
    }
  };

  barLogic = () => {
    const { shares } = this.state;
    if (shares <= 150) {
      this.setState({ progress: shares / 150 * 100 });
    } else if (shares >= 151 && shares <= 500) {
      this.setState({ progress: shares / 1000 * 100 });
    } else if (shares >= 501 && shares <= 1000) {
      this.setState({ progress: shares / 2000 * 100 });
    } else if (shares >= 1001) {
      this.setState({ progress: 100 });
    }
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const { progress } = this.state;
    const { num_shares } = this.props;

    return (
      <Card>
        <Card.Content>
          <Card.Header>Number of Shares</Card.Header>
          <Card.Description>
            <strong>{this.state.shares}</strong>
          </Card.Description>
          <Progress percent={progress} indicating />
          <Container
            dangerouslySetInnerHTML={this.createMarkup(
              num_shares,
            )}
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rewards: state.rewards,
    num_shares: state.settings.num_shares,
  };
};

export default connect(mapStateToProps)(TotalSharesTile);
