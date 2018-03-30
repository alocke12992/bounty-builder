import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateLogo} from '../actions/settings'
import {Button, Form, Grid, Header, Image} from 'semantic-ui-react';

class LogoUploader extends React.Component {
  state = {logo_url: ''}

  logoChange = (files) => {
    this.setState({logo_url: files[0]})
  }

  logoSubmit = () => {
    const {logo_url} = this.state
    const {dispatch, id} = this.props
    dispatch(updateLogo(logo_url, id))
  }

  render() {
    const {logo_url} = this.state
    const {logo} = this.props;
    return (
      <Grid.Column >
        <Grid.Row>
          <Header as='h3'>Current Logo</Header>
          <Image src={logo} />
        </Grid.Row>
        <Grid.Row>
          <Form onSubmit={this.logoSubmit}>
            <Grid.Column width={6}>
              <Dropzone
                onDrop={this.logoChange}
                multiple={false}
              > Click here to upload
              {logo_url && <Image size='medium' src={logo_url.preview} />}
              </Dropzone>
            </Grid.Column>
            <Grid.Column>
              <Button>Submit</Button>
            </Grid.Column>
          </Form>
        </Grid.Row>
      </Grid.Column>
    );
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    logo: settings.logo_url,
  };
};

export default connect(mapStateToProps)(LogoUploader);
