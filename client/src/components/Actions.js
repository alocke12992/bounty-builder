import React from 'react';
import { Card } from 'semantic-ui-react';
import Wallet from './Wallet';
import Facebook from './Facebook';
import LinkedIn from './LinkedIn';
import Twitter from './Twitter';
import Reddit from './Reddit';

const Actions = () => (
  <Card.Group itemsPerRow={4}>
    { [Wallet, Facebook, LinkedIn, Twitter, Reddit].map( (Component, i) => 
        <Component key={i} />
      )
    }
  </Card.Group>
)

export default Actions;
