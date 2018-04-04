import React from 'react'
import Dashboard from './Dashboard';
import Facebook from './Facebook';
import LinkedIn from './LinkedIn';
import NoMatch from './NoMatch';
import Reddit from './Reddit';
import Rules from './Rules';
import Social from './Social';
import Translation from './Translation';
import Twitter from './Twitter';
import VideoContest from './VideoContest';
import { connect } from 'react-redux';
import { Container, Grid, Menu } from 'semantic-ui-react';
import { getRewards } from '../actions/rewards';
import { Link, Route, Switch, } from 'react-router-dom';

class Home extends React.Component {

  componentWillMount() {
    this.props.dispatch( getRewards() );
  };

  render() {
    const { pathname } = this.props.location;
    
    return (
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 5 }>
              <Menu pointing vertical size='large'>
                { routes.map( ( route, index ) => (
                  <Menu.Item
                    key={ index }
                    as={ Link }
                    to={ route.path }
                    name={ route.name }
                    active={ pathname === route.path }
                  />
                ) ) }
              </Menu>
            </Grid.Column>
            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 11 }>
              <Switch>
                { routes.map( ( route, index ) => (
                  <Route
                    key={ index }
                    path={ route.path }
                    exact={ route.exact }
                    component={ route.main }
                  />
                ) ) }
                <Route component={ NoMatch } />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
};

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    exact: true,
    main: () => <Dashboard />
  },
  {
    name: 'Facebook',
    path: '/facebook',
    main: () => <Facebook service="facebook" />
  },
  {
    name: 'Twitter',
    path: '/twitter',
    main: () => <Twitter service="twitter" submissions={true} />
  },
  {
    name: 'LinkedIn',
    path: '/linkedin',
    main: () => <LinkedIn service="linkedin" submissions={true} />
  },
  {
    name: 'Reddit',
    path: '/reddit',
    main: () => <Reddit service="reddit" submissions={true} />
  },
  {
    name: 'Influencer',
    path: '/influencer',
    main: () => <Social service="influencer" submissions={true} />
  },
  {
    name: 'Translation',
    path: '/translation',
    main: () => <Translation />
  },
  {
    name: 'Video Contest',
    path: '/contest',
    main: () => <VideoContest />
  },
  {
    name: 'Rules and Overview',
    path: '/rules',
    main: () => <Rules />
  }
];

export default connect()( Home );
