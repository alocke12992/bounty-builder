import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../../actions/headers';
import { Button, Container, Segment, } from 'semantic-ui-react';

class GenerateCsv extends React.Component {
  state = { loading: false, csvString: "Email,Wallet,Amount\n", currentPage: 1}

  download = () => {
    this.setState({loading: true})
    this.fetchMore(1);
  }

  fetchMore = (page) => {
    axios.get(`/api/moderator/generate_csv?page=${page}`)
    .then( res => {
      let totalPages = res.data.total_pages;
      this.setState({currentPage: this.state.currentPage + 1, csvString: this.state.csvString + res.data.csv_string})
      this.props.dispatch(setHeaders(res.headers));
      if(this.state.currentPage > totalPages ){
        saveData(this.state.csvString, "DeconetBounty" + new Date() + ".csv");
        this.setState({loading: false, currentPage: 1, csvString: "Email,Wallet,Amount\n"});
      }else{
        this.fetchMore(page + 1)
      }
    })
  }

  render(){
    const { loading } = this.state;
    return(
      <Container>
        <Segment>
          <p>Press download for a current snapshot of users in the bounty program. This may take some time.</p>
          <Button disabled={loading} onClick={this.download}>{ loading ? 'Loading...' : 'Download'}</Button>
        </Segment>
      </Container>
    )
  }
}

const saveData = (function () {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
    const blob = new Blob([data], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());

export default connect()(GenerateCsv);
