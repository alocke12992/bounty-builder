import React from 'react';
import About from './About';
import AdminRoute from './AdminRoute';
import AuthRoute from './AuthRoute';
import DeconetOauth from './DeconetOauth';
import FetchUser from './FetchUser';
import Flash from './Flash';
import Home from './Home';
import Login from './Login';
import ModeratorHome from './moderator/ModeratorHome';
import NavBar from './NavBar';
import NewPost from './NewPost';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import RecoverPassword from './RecoverPassword';
import Register from './Register';
import Settings from './Settings'
import { connect } from 'react-redux';
import { fetchSettings } from '../actions/settings';
import { Route, Switch, } from 'react-router-dom';

class FetchSettings extends React.Component {
  state = { loaded: false };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSettings(this.toggleLoaded));
  }

  toggleLoaded = () => this.setState({ loaded: !this.state.loaded });

  render() {
    const { loaded } = this.state;

    if(loaded) {
      return(
        <Switch>
          <Route exact path='/auth/Deconet/callback' component={DeconetOauth} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <AuthRoute exact path='/recover_password' component={RecoverPassword} />
          <Route exact path='/about' component={About} />
          <Route exact path='/settings' component={Settings} />
          <AdminRoute exact path='/admin' component={NewPost} />
          <AdminRoute path='/moderate' component={ModeratorHome} />
          <ProtectedRoute path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      );
    } else {
      return null;
    }
  }
}

export default connect()(FetchSettings);