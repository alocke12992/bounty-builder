import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import FetchUser from './FetchUser';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import AdminRoute from './AdminRoute';
import NewPost from './NewPost';
import RecoverPassword from './RecoverPassword';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <AuthRoute exact path='/recover_password' component={RecoverPassword} />
            <Route exact path='/about' component={About} />
            <AdminRoute exact path='/admin' component={NewPost}/>
            {/*<AdminModeratorRoute path='/moderate' component={ModeratorHome}/>*/}
            <ProtectedRoute path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;
