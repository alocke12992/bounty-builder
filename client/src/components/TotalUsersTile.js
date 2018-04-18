import React from 'react';
import axios from 'axios';
import GenerateHtml from './GenerateHtml';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import {
  Card,
  Progress,
} from 'semantic-ui-react';

class TotalUsersTile extends React.Component {
  state = { progress: 0, users: 0 };

  componentDidMount() {
    axios.get('/api/users/total_user_count').then((res) => {
      this.setState({ users: res.data }, () =>
        this.barLogic(),
      );
      this.props.dispatch(setHeaders(res.headers));
    });
  }

  barLogic = () => {
    const { users } = this.state;
    if (users <= 2500) {
      this.setState({ progress: users / 2500 * 100 });
    } else if (users >= 2501 && users <= 5000) {
      this.setState({ progress: users / 5000 * 100 });
    } else if (users >= 5001 && users <= 10000) {
      this.setState({ progress: users / 10000 * 100 });
    } else if (users >= 10000) {
      this.setState({ progress: 100 });
    }
  };

  render() {
    const { progress } = this.state;
    const { dash_users } = this.props;

    return (
      <Card>
        <Card.Content>
          <Card.Header>Number of Users</Card.Header>
          <Card.Description>
            <strong>{this.state.users}</strong>
          </Card.Description>
          <Progress percent={progress} indicating />
          <GenerateHtml text={dash_users} />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { dash_users: state.settings.dash_users };
};
export default connect(mapStateToProps)(TotalUsersTile);
