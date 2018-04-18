import React from 'react';
import ThemeOptions from './ThemeOptions';
import DashboardForm from './DashboardForm';
import InfluencerForm from './InfluencerForm';
import ModeratorForm from './ModeratorForm';
import ProviderForm from './ProviderForm';
import RulesForm from './RulesForm';
import TranslationForm from './TranslationForm';
import WelcomeForm from './WelcomeForm';
import VideoContestForm from './VideoContestForm';
import { connect } from 'react-redux';
import {
  Container,
  Divider,
  Header,
  Menu,
  Segment,
} from 'semantic-ui-react';

class Settings extends React.Component {
  state = { activeItem: 'theme_options' };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name });

  themeOptions = () => {
    return <ThemeOptions />;
  };
  
  moderator = () => {
    return <ModeratorForm />;
  };

  welcomeForm = () => {
    return <WelcomeForm />;
  }
  
  dashboard = () => {
    return <DashboardForm />;
  };
  
  rules = () => {
    return <RulesForm />;
  };
  influencer = () => {
    return <InfluencerForm />;
  };
  
  provider = () => {
    return <ProviderForm />;
  };
  
  
  translation = () => {
    return <TranslationForm />;
  };
  
  videoContest = () => {
    return <VideoContestForm />;
  };
  
 
  
  
  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <Header as="h1" color="blue">
          Settings
        </Header>
        <Divider hidden />
        <Menu attached="top" pointing>
          <Menu.Item
            name="theme_options"
            active={activeItem === 'theme_otions'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="moderator"
            active={activeItem === 'moderator'}
            onClick={this.handleItemClick}
          />
           <Menu.Item
            name="welcome"
            active={activeItem === 'welcomeForm'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="dashboard"
            active={activeItem === 'dashboard'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="rules"
            active={activeItem === 'rules'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="provider"
            active={activeItem === 'provider'}
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
          <Menu.Item
            name="video_contest"
            active={activeItem === 'video_contest'}
            onClick={this.handleItemClick}
          />
         
        </Menu>
        
        <Divider hidden />
        <Segment>
          {activeItem === 'theme_options' &&
            this.themeOptions()}
          {activeItem === 'dashboard' && this.dashboard()}
          {activeItem === 'rules' && this.rules()}
          {activeItem === 'provider' && this.provider()}
          {activeItem === 'influencer' &&
            this.influencer()}
          {activeItem === 'translation' &&
            this.translation()}
          {activeItem === 'video_contest' &&
            this.videoContest()}
          {activeItem === 'moderator' && this.moderator()}
          {activeItem === 'welcome' && this.welcomeForm()}
        </Segment>
      </Container>
    );
  }
}

export const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['link'],
  ['clean'],
];

export default connect()(Settings);
