import React from 'react';
import GenerateHtml from './GenerateHtml';
import { connect } from 'react-redux';
import {
  Card,
  Container,
  Progress,
} from 'semantic-ui-react';

class TotalTokensTile extends React.Component {
  state = { tokens: '0', progress: 0 };

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
    this.setState({ tokens: sum });
  };

  barLogic = () => {
    const { tokens } = this.state;
    if (tokens <= 150) {
      this.setState({ progress: tokens / 150 * 100 });
    } else if (tokens >= 151 && tokens <= 500) {
      this.setState({ progress: tokens / 1000 * 100 });
    } else if (tokens >= 501 && tokens <= 1000) {
      this.setState({ progress: tokens / 2000 * 100 });
    } else if (tokens >= 1001) {
      this.setState({ progress: 100 });
    }
  };

  barLogic = () => {
    const { tokens } = this.state;
    if (tokens <= 150) {
      this.setState({ progress: tokens / 150 * 100 });
    } else if (tokens >= 151 && tokens <= 500) {
      this.setState({ progress: tokens / 1000 * 100 });
    } else if (tokens >= 501 && tokens <= 1000) {
      this.setState({ progress: tokens / 2000 * 100 });
    } else if (tokens >= 1001) {
      this.setState({ progress: 100 });
    }
  };

  render() {
    const { progress } = this.state;
    const { dash_tokens } = this.props;

    return (
      <Card>
        <Card.Content>
          <Card.Header>Number of Tokens</Card.Header>
          <Card.Description>
            <strong>{this.state.tokens}</strong>
          </Card.Description>
          <Progress percent={progress} indicating />
          <GenerateHtml text={dash_tokens} />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rewards: state.rewards,
    dash_tokens: state.settings.dash_tokens,
  };
};

export default connect(mapStateToProps)(TotalTokensTile);
