import React from 'react'
import {
  Link,
  Switch,
  Route
} from 'react-router-dom'
import { Grid, Container, Menu } from 'semantic-ui-react';
import NoMatch from '../NoMatch';
import { connect } from 'react-redux';
import ModerateRewards from './ModerateRewards';

const routes = [
  { path: '/moderate',
    exact: true,
    main: () => <ModerateRewards/>
  },
  { path: '/moderate/submissions',
    main: () => <NoMatch service="facebook"/>
  },
]

class ModeratorHome extends React.Component{
  // componentWillMount(){
  //   this.props.dispatch(getRewards());
  // }
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

export default connect()(ModeratorHome);
