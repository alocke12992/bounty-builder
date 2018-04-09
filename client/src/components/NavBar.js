import React, {Component, Fragment} from 'react';
import LaptopNavBar from './LaptopNavBar';
import MobileNavBar from './MobileNavBar';
import TabletNavBar from './TabletNavBar';
import {Responsive, Container} from 'semantic-ui-react';

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
          minWidth={768}
          style={{marginBottom: '100px'}}
        >
          <TabletNavBar />
        </Responsive>
        <Responsive
          as='div'
          maxWidth={767}
          style={{marginBottom: '65px'}}
        >
          <MobileNavBar />
        </Responsive>
      </Fragment>
    );
  }
};

export default NavBar
