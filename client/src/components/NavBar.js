import React, { Component, Fragment } from 'react';
import LaptopNavBar from './LaptopNavBar';
import MobileNavBar from './MobileNavBar';
import { Responsive } from 'semantic-ui-react';

class NavBar extends Component {

  render() {
    return (
      <Fragment>
        <Responsive
          as='div'
          minWidth={992}
          style={{marginBottom: '25px'}}
        >
          <LaptopNavBar />
        </Responsive>
        <Responsive
          as='div'
          maxWidth={991}
          style={{marginBottom: '65px'}}
        >
          <MobileNavBar />
        </Responsive>
      </Fragment>
    );
  }
};

export default NavBar
