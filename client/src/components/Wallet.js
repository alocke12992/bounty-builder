import React from 'react';
import { Button, Icon, Card, Header, Form, Image, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import eth from '../images/ETHEREUM.png';

class Wallet extends React.Component {
  state = { points: 0, walletAddress: '', editable: false }

  componentDidMount() {
    axios.get('/api/wallet')
      .then( res => {
        let editable = true;
        if (res.data.length)
          editable = false
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ walletAddress: res.data, editable });
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
        this.toggleEdit();
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Wallet updated', 'green'));
      })
      .catch( err => {
        //TODO
      })
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editable: !state.editable }
    });
  }

  render() { 
    const { points, walletAddress, editable } = this.state;
    let readOnly = {};
    let showEdit = false;
    if (!editable) {
      readOnly = { disabled: true }
      showEdit = true;
    }
    return (
      <Card>
        <Card.Header>
          <Divider hidden />
          <Header as="h1"textAlign="center">{points}</Header>
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
              {...readOnly}
            />
            { showEdit ?
                <Button 
                  onClick={this.toggleEdit}
                  type="button"
                >
                  Edit
                </Button>
                :
                <Form.Button>Save</Form.Button>
            }
          </Form>
          <Divider hidden />
          <Image src={eth} centered alt="Ethereum logo"  size="tiny" />
          <Divider hidden />
          <p>
            Want to know what your Ethereum's worth?
Multiply your Ethereum by today's
            <a
              href="https://www.coindesk.com/ethereum-price/"
              rel="noopener noreferrer"
              target="_blank"
            >
              {' '}
              price
            </a>
          </p>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(Wallet);
