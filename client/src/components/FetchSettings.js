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
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import RecoverPassword from './RecoverPassword';
import Register from './Register';
import Settings from './Settings'
import {connect} from 'react-redux';
import {fetchSettings} from '../actions/settings';
import {Route, Switch, } from 'react-router-dom';

class FetchSettings extends React.Component {
  state = {loaded: false};

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchSettings(this.loaded));
  }

  componentWillReceiveProps() {
    if (!this.state.loaded) this.loaded();
  }

  loaded = () => this.setState({loaded: true});

  render() {
    const {loaded} = this.state;

    return loaded ? this.props.children : null
  }
}

export default connect()(FetchSettings);