import React from 'react';
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
import {
  Container,
  Grid,
  Menu,
  Responsive,
} from 'semantic-ui-react';
import { getRewards } from '../actions/rewards';
import { Link, Route, Switch } from 'react-router-dom';

class Home extends React.Component {
  state = { currentRoutes: [] };

  componentDidMount() {
    this.props.dispatch(getRewards());
    this.toggleRoutes();
  }

  setActive = (routes) => {
    const { currentRoutes } = this.state;
    const activeRoutes = [];
    routes.map(
      (route) =>
        route.active === true && activeRoutes.push(route),
    );
    this.setState({ currentRoutes: activeRoutes });
  };

  toggleRoutes = () => {
    const {
      facebook,
      twitter,
      linkedin,
      reddit,
    } = this.props;

    const routes = [
      {
        name: 'Dashboard',
        path: '/',
        exact: true,
        active: true,
        main: () => <Dashboard />,
      },
      {
        name: 'Rules and Overview',
        path: '/rules',
        active: true,
        main: () => <Rules />,
      },
      {
        name: 'Influencer',
        path: '/influencer',
        active: true,
        main: () => (
          <Social
            service="influencer"
            submissions={true}
          />
        ),
      },
      {
        name: 'Translation',
        path: '/translation',
        active: true,
        main: () => <Translation />,
      },
      {
        name: 'Video Contest',
        path: '/contest',
        active: true,
        main: () => <VideoContest />,
      },
      {
        name: 'Facebook',
        path: '/facebook',
        active: facebook,
        main: () => <Facebook service="facebook" />,
      },
      {
        name: 'Twitter',
        path: '/twitter',
        active: twitter,
        main: () => (
          <Twitter service="twitter" submissions={true} />
        ),
      },
      {
        name: 'LinkedIn',
        path: '/linkedin',
        active: linkedin,
        main: () => (
          <LinkedIn
            service="linkedin"
            submissions={true}
          />
        ),
      },
      {
        name: 'Reddit',
        path: '/reddit',
        active: reddit,
        main: () => (
          <Reddit service="reddit" submissions={true} />
        ),
      },
    ];
    this.setActive(routes);
  };

  render() {
    const { pathname } = this.props.location;
    const { currentRoutes } = this.state;

    return (
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={5}>
              <Responsive
                minWidth={992}
                as={Menu}
                pointing
                vertical
                size="large">
                {currentRoutes.map((route, index) => (
                  <Menu.Item
                    key={index}
                    as={Link}
                    to={route.path}
                    name={route.name}
                    active={pathname === route.path}
                  />
                ))}
              </Responsive>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={11}>
              <Switch>
                {currentRoutes.map((route, index) => (
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
    );
  }
}

const mapStateToProps = (state) => {
  const {
    facebook,
    twitter,
    linkedin,
    reddit,
  } = state.settings;
  return {
    facebook,
    twitter,
    linkedin,
    reddit,
  };
};
export default connect(mapStateToProps)(Home);
