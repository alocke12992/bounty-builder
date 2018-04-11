import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateLogo} from '../actions/settings'
import {Button, Form, Grid, Header, Image} from 'semantic-ui-react';

class LogoUploader extends React.Component {
  state = {theme_logo: ''}

  logoChange = (files) => {
    this.setState({theme_logo: files[0]})
  }

  logoSubmit = () => {
    const {theme_logo} = this.state
    const {dispatch, id} = this.props
    dispatch(updateLogo(theme_logo, id))
  }

  render() {
    const {theme_logo} = this.state
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
              {theme_logo && <Image size='medium' src={theme_logo.preview} />}
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
    logo: settings.theme_logo,
  };
};

export default connect(mapStateToProps)(LogoUploader);