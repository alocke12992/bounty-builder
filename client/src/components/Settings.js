import React from 'react';
import { connect } from 'react-redux';
import ColorPicker from './ColorPicker';
import DashboardForm from './DashboardForm';
import InfluencerForm from './InfluencerForm';
import ProviderForm from './ProviderForm';
import RulesForm from './RulesForm';
import styled from 'styled-components';
import TranslationForm from './TranslationForm';
import {
  Container,
  Divider,
  Header,
  Menu,
  Segment,
} from 'semantic-ui-react';

class Settings extends React.Component {
  state = { activeItem: 'color_picker' };

  handleItemClick = ( e, { name } ) =>
    this.setState( { activeItem: name } );

  colorPicker = () => {
    return <ColorPicker />
  };

  dashboard = () => {
    return <DashboardForm />;
  };

  provider = () => {
    return <ProviderForm />;
  };

  rules = () => {
    return <RulesForm />;
  };

  influencer = () => {
    return <InfluencerForm />;
  };

  translation = () => {
    return <TranslationForm />;
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <Header as="h1">Settings</Header>
        <Divider hidden />
        <Menu attached="top" pointing>
          <Menu.Item
            name="color_picker"
            active={ activeItem === 'color_picker' }
            onClick={ this.handleItemClick }
          />
          <Menu.Item
            name="dashboard"
            active={ activeItem === 'dashboard' }
            onClick={ this.handleItemClick }
          />
          <Menu.Item
            name="provider"
            active={ activeItem === 'provider' }
            onClick={ this.handleItemClick }
          />
          <Menu.Item
            name="rules"
            active={ activeItem === 'rules' }
            onClick={ this.handleItemClick }
          />
          <Menu.Item
            name="influencer"
            active={ activeItem === 'influencer' }
            onClick={ this.handleItemClick }
          />
          <Menu.Item
            name="translation"
            active={ activeItem === 'translation' }
            onClick={ this.handleItemClick }
          />
        </Menu>
        <Divider hidden />
        <Segment>
          { activeItem === 'color_picker' &&
            this.colorPicker() }
          { activeItem === 'dashboard' &&
            this.dashboard() }
          { activeItem === 'provider' &&
            this.provider() }
          { activeItem === 'rules' && this.rules() }
          { activeItem === 'influencer' &&
            this.influencer() }
          { activeItem === 'translation' &&
            this.translation() }
        </Segment>
      </Container>
    );
  }
}

export default connect()( Settings );
