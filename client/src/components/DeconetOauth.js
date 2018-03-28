import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import { Container, Grid, Segment, } from 'semantic-ui-react';
const queryString = require('query-string');

class DeconetOauth extends React.Component {
  
  componentDidMount(){
    const parsed = queryString.parse(this.props.location.search);
    const { dispatch, history } = this.props;

    axios.post('/api/oauth', { code: parsed.code, state: parsed.state } )
      .then(res => {
        dispatch(setHeaders(res.headers));
        dispatch({ type: 'LOGIN', user: res.data });
        history.replace('/');
      })
      .catch( error => {
        history.push('/login');
        dispatch(setHeaders(error.headers));
        dispatch(setFlash(error.response.data.errors, 'red'))
      });
  }

  render() {
    return (
      <Container>
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                Please wait, signing you in...
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default connect()(DeconetOauth);
