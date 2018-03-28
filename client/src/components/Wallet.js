import React from 'react';
import axios from 'axios';
import eth from '../images/ETHEREUM.png';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { Card, Divider, Form, Header, Image, } from 'semantic-ui-react';

class Wallet extends React.Component {
  state = { walletAddress: '' };

  componentDidMount() {
    axios.get('/api/wallet')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ walletAddress: res.data });
      });
  };

  handleChange = (e) => {
    this.setState({ walletAddress: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { walletAddress } = this.state;
    axios.post('/api/wallet', { wallet: walletAddress } )
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Wallet updated', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
      })
  };

  render() {
    const { walletAddress } = this.state;
    
    return (
      <Card>
        <Card.Header>
          <Divider hidden />
          <Header as="h1"textAlign="center">Ethereum</Header>
        </Card.Header>
        <Card.Content textAlign="center">
          <p>
            Dont't have a
            <a
              href="https://www.youtube.com/watch?v=phht73IvUDI"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              ERC20 Standard Wallet ID?
            </a>
          </p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={walletAddress}
              onChange={this.handleChange}
              required
              placeholder="ETH address"
            />
            <Form.Button>Save</Form.Button>
          </Form>
          <Divider hidden />
          <p><strong>Warning!</strong> You may only enter your Ethereum address once. After that, it will not be able to be changed.</p>
          <p>Ethereum address must not be tied to an exchange, it must be a separate, standard wallet.</p>
          <Image src={eth} centered alt="Ethereum logo"  size="tiny" />
          <Divider hidden />
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(Wallet);
