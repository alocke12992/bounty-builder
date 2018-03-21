import React from 'react'
import {
  Link,
  Switch,
  Route,
} from 'react-router-dom'
import { Grid, Container, Menu } from 'semantic-ui-react';
import Dashboard from './Dashboard';
import NoMatch from './NoMatch';
import Social from './Social';
import Facebook from './Facebook';
import Twitter from './Twitter';
import Translation from './Translation';
import { getRewards } from '../actions/rewards';
import { connect } from 'react-redux';
import LinkedIn from './LinkedIn';
import Reddit from './Reddit';
import Rules from './Rules';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: '/facebook',
    main: () => <Facebook service="facebook" />
  },
  {
    path: '/twitter',
    main: () => <Twitter service="twitter" submissions={ true } />
  },
  {
    path: '/linkedin',
    main: () => <LinkedIn service="linkedin" submissions={ true } />
  },
  {
    path: '/reddit',
    main: () => <Reddit service="reddit" submissions={ true } />
  },
  {
    path: '/influencer',
    main: () => <Social service="influencer" submissions={ true } />
  },
  {
    path: '/translation',
    main: () => <Translation />
  },
  {
    path: '/rules',
    main: () => <Rules />
  }
]

class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch( getRewards() );
  }
  render() {
    const { pathname } = this.props.location;
    return (
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 5 }>
              <Menu pointing vertical size='large'>
                <Menu.Item as={ Link } to='/' name='Dashboard' active={ pathname === '/' } />
                <Menu.Item as={ Link } to='/facebook' name='Facebook' active={ pathname === '/facebook' } />
                <Menu.Item as={ Link } to='/twitter' name='Twitter' active={ pathname === '/twitter' } />
                <Menu.Item as={ Link } to='/linkedin' name='LinkedIn' active={ pathname === '/linkedin' } />
                <Menu.Item as={ Link } to='/reddit' name='Reddit' active={ pathname === '/reddit' } />
                <Menu.Item as={ Link } to='/influencer' name='Influencer' active={ pathname === '/influencer' } />
                <Menu.Item as={ Link } to='/translation' name='Translation' active={ pathname === '/translation' } />
                <Menu.Item as={ Link } to='/rules' name='Rules and Overview' active={ pathname === '/rules' } />
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
}

const mapStateToProps = ( state, props ) => {

}

export default connect()( Home );
