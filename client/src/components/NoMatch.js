import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NoMatch extends React.Component {
  render() {
    return (
      <Header>
        <strong>
          <span
            style={{
              fontSize: '70pt',
              lineHeight: '142%',
            }}>
            ERROR!
          </span>
          <br/>
          <span
            style={{
              fontSize: '40pt',
              lineHeight: '142%', 
            }}>
            PAGE NOT FOUND
          </span>
        </strong>

        <br/>
        <br/>
        <br/>
        <br/>

        <footer><Link to='/'>To Go Back Home</Link></footer>
      </Header>
    );
  }
}

export default NoMatch;
