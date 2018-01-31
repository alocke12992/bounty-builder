import React from 'react';
import { Card, Header, Form, Image, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import eth from '../images/ETHEREUM.png';

class Wallet extends React.Component {
  state = { walletAddress: '', showField: false }

  componentDidMount() {
    axios.get('/api/wallet')
      .then( res => {
        let showField;
        if (res.data.toString().length > 0){
          showField = false;
        }
        else {
          showField = true;
        }
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ walletAddress: res.data, showField });
      });
  }

  handleChange = (e) => {
    this.setState({ walletAddress: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { walletAddress } = this.state;
    axios.post('/api/wallet', { wallet: walletAddress } )
      .then( res => {
        this.setState({showField: false});
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Wallet updated', 'green'));
      })
      .catch( err => {
        //TODO
      })
  }

  render() {
    const { walletAddress, showField } = this.state;
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
              disabled={!showField}
            />
          { showField && <Form.Button>Save</Form.Button> }
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
