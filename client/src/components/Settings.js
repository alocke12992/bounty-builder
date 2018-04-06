import React from 'react';
import ThemeOptions from './ThemeOptions';
import DashboardForm from './DashboardForm';
import {fetchSettings} from '../actions/settings';
import InfluencerForm from './InfluencerForm';
import ProviderForm from './ProviderForm';
import RulesForm from './RulesForm';
import styled from 'styled-components';
import TranslationForm from './TranslationForm';
import {connect} from 'react-redux';
import {
  Container,
  Divider,
  Header,
  Menu,
  Segment,
} from 'semantic-ui-react';

class Settings extends React.Component {
  state = {activeItem: 'theme_options'};

  handleItemClick = (e, {name}) =>
    this.setState({activeItem: name});

  themeOptions = () => {
    return <ThemeOptions />;
  };

  dashboard = () => {
    return <DashboardForm />;
  };

  influencer = () => {
    return <InfluencerForm />;
  };

  provider = () => {
    return <ProviderForm />;
  };

  rules = () => {
    return <RulesForm />;
  };

  translation = () => {
    return <TranslationForm />;
  };

  render() {
    const {activeItem} = this.state;

    return (
      <Container>
        <Header as="h1">Settings</Header>
        <Divider hidden />
        <Menu attached="top" pointing>
          <Menu.Item
            name="theme_options"
            active={activeItem === 'theme_otions'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="dashboard"
            active={activeItem === 'dashboard'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="provider"
            active={activeItem === 'provider'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="rules"
            active={activeItem === 'rules'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="influencer"
            active={activeItem === 'influencer'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="translation"
            active={activeItem === 'translation'}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Divider hidden />
        <Segment>
          {activeItem === 'theme_options' &&
            this.themeOptions()}
          {activeItem === 'dashboard' &&
            this.dashboard()}
          {activeItem === 'provider' &&
            this.provider()}
          {activeItem === 'rules' && this.rules()}
          {activeItem === 'influencer' &&
            this.influencer()}
          {activeItem === 'translation' &&
            this.translation()}
        </Segment>
      </Container>
    );
  }
}

export const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
];

export default connect()(Settings);
