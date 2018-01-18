import React from 'react'
import {
  Link,
  Switch,
  Route
} from 'react-router-dom'
import { Grid, Container, Menu } from 'semantic-ui-react';
import Dashboard from './Dashboard';
import NoMatch from './NoMatch';
import Social from './Social';
import Facebook from './Facebook';
import Twitter from './Twitter';
import Wallet from './Wallet';
import Blog from './Blog';

const routes = [
  { path: '/',
    exact: true,
    main: () => <Dashboard/>
  },
  { path: '/facebook',
    main: () => <Facebook service="facebook"/>
  },
  { path: '/twitter',
    main: () => <Twitter service="twitter"/>
  },
  { path: '/linkedin',
    main: () => <Social service="linkedin"/>
  },
  { path: '/reddit',
    main: () => <Social service="reddit"/>
  },
  { path: '/blog',
    main: () => <Blog service="blog"/>
  },
  { path: '/influencer',
    main: () => <Social service="influencer"/>
  },
  { path: '/telegram',
    main: () => <Social service="telegram"/>
  },
  { path: '/discord',
    main: () => <Social service="discord"/>
  },
  { path: '/referral',
    main: () => <h2>Referral - Coming Soon</h2>
  },
  { path: '/translation',
    main: () => <h2>Translations - Coming Soon</h2>
  },
  { path: '/wallet',
    main: () => <Wallet/>
  }
]

class Home extends React.Component{
  render(){
    const { pathname } = this.props.location;
    return(
      <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={5}>
                <Menu pointing vertical size='large'>
                  <Menu.Item as={Link} to='/' name='Dashboard' active={pathname === '/'}/>
                  <Menu.Item as={Link} to='/facebook' name='Facebook' active={pathname === '/facebook'}/>
                  <Menu.Item as={Link} to='/twitter' name='Twitter' active={pathname === '/twitter'}/>
                  <Menu.Item as={Link} to='/linkedin' name='LinkedIn' active={pathname === '/linkedin'}/>
                  <Menu.Item as={Link} to='/reddit' name='Reddit' active={pathname === '/reddit'}/>
                  <Menu.Item as={Link} to='/blog' name='Blog' active={pathname === '/blog'}/>
                  <Menu.Item as={Link} to='/influencer' name='Influencer' active={pathname === '/influencer'}/>
                  <Menu.Item as={Link} to='/telegram' name='Telegram' active={pathname === '/telegram'}/>
                  <Menu.Item as={Link} to='/discord' name='Discord' active={pathname === '/discord'}/>
                  <Menu.Item as={Link} to='/referral' name='Referral' active={pathname === '/referral'}/>
                  <Menu.Item as={Link} to='/translation' name='Translation' active={pathname === '/translation'}/>
                  <Menu.Item as={Link} to='/wallet' name='Wallet' active={pathname === '/wallet'}/>
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

export default Home
