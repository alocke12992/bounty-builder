import React, { Component } from 'react';
import About from './About';
import AdminRoute from './AdminRoute';
import AuthRoute from './AuthRoute';
import DeconetOauth from './DeconetOauth';
import FetchSettings from './FetchSettings';
import FetchUser from './FetchUser';
import Flash from './Flash';
import Home from './Home';
import Login from './Login';
import ModeratorHome from './moderator/ModeratorHome';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import RecoverPassword from './RecoverPassword';
import Register from './Register';
import Settings from './Settings';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <FetchSettings>
            <Switch>
              <Route exact path='/auth/Deconet/callback' component={DeconetOauth} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/register' component={Register} />
              <AuthRoute exact path='/recover_password' component={RecoverPassword} />
              <Route exact path='/about' component={About} />
              <Route exact path='/settings' component={Settings} />
              <AdminRoute path='/moderate' component={ModeratorHome} />
              <ProtectedRoute path="/" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </FetchSettings>
        </FetchUser>
      </div>
    );
  }
}

export default App;
