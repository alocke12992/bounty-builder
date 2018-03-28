import React from 'react'
import GenerateCsv from './GenerateCsv';
import ModerateApproveInfluencers from './ModerateApproveInfluencers';
import ModerateApproveTranslators from './ModerateApproveTranslators';
import ModerateDiscords from './ModerateDiscords';
import ModerateRewards from './ModerateRewards';
import ModerateSubmissions from './ModerateSubmissions';
import ModerateTelegrams from './ModerateTelegrams';
import NoMatch from '../NoMatch';
import { connect } from 'react-redux';
import { Link, Route, Switch, } from 'react-router-dom'
import { Container, Grid, Menu, } from 'semantic-ui-react';

class ModeratorHome extends React.Component{
  render(){
    const { pathname } = this.props.location;
    
    return(
      <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={5}>
                <Menu pointing vertical size='large'>
                  <Menu.Item as={Link} to='/moderate' name='Rewards' active={pathname === '/moderate'}/>
                  <Menu.Item as={Link} to='/moderate/submissions' name='Submissions' active={pathname === '/moderate/submissions'}/>
                  <Menu.Item as={Link} to='/moderate/telegram' name='Telegram' active={pathname === '/moderate/telegram'}/>
                  <Menu.Item as={Link} to='/moderate/discord' name='Discord' active={pathname === '/moderate/discord'}/>
                  <Menu.Item as={Link} to='/moderate/translators' name='Add Translator' active={pathname === '/moderate/translators'}/>
                  <Menu.Item as={Link} to='/moderate/influencers' name='Add Influencer' active={pathname === '/moderate/influencers'}/>
                </Menu>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={11}>
                <Switch>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                      />
                  ))}
                  <Route component={NoMatch} />
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Container>
    )
  }
}

const routes = [
  {
    path: '/moderate',
    exact: true,
    main: () => <ModerateRewards />
  },
  {
    path: '/moderate/submissions',
    main: () => <ModerateSubmissions />
  },
  {
    path: '/moderate/telegram',
    main: () => <ModerateTelegrams />
  },
  {
    path: '/moderate/discord',
    main: () => <ModerateDiscords />
  },
  {
    path: '/moderate/translators',
    main: () => <ModerateApproveTranslators />
  },
  {
    path: '/moderate/generate_csv',
    main: () => <GenerateCsv />
  },
  {
    path: '/moderate/influencers',
    main: () => <ModerateApproveInfluencers />
  }
]

export default connect()(ModeratorHome);
