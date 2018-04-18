import React from 'react';
import {connect} from 'react-redux';
import {fetchSettings} from '../actions/settings';

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