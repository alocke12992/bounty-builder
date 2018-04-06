import React from 'react';
import GenerateHtml from './GenerateHtml';
import { connect } from 'react-redux';
import {
  Card,
  Container,
  Header,
  List,
} from 'semantic-ui-react';

class ChatRules extends React.Component {

  render() {
    const { telegram } = this.props;
    return (
      <Card>
        <Card.Content>
          <Header as="h2">Telegram:</Header>
          <GenerateHtml text={telegram} />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { telegram: state.settings.telegram };
};

export default connect(mapStateToProps)(ChatRules);
