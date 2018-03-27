import React, { Component } from 'react';
import About from './About';
import AdminRoute from './AdminRoute';
import AuthRoute from './AuthRoute';
import DeconetOauth from './DeconetOauth';
import DevRoute from './DevRoute';
import FetchSettings from './FetchSettings';
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
import Settings from './Settings';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <FetchSettings />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;
