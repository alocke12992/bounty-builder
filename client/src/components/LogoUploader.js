import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {updateLogo} from '../actions/settings';
import {Button, Form, Grid, Header, Image, Divider} from 'semantic-ui-react';

class LogoUploader extends React.Component {
  state = {theme_logo: ''}

  logoChange = (files) => {
    this.setState({theme_logo: files[0]})
  }

  logoSubmit = () => {
    const {theme_logo} = this.state
    const {dispatch, id} = this.props
    dispatch(updateLogo(theme_logo, id))
    this.setState({theme_logo: ''})
  }

  render() {
    const {theme_logo} = this.state
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row centered>
          <Grid.Column  width={8}>
            <Header textAlign='center' as='h2'>
              Logo Uploader
            </Header>
            <Divider />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={10}>
            <Form onSubmit={this.logoSubmit}>
              <Form.Group>
                <Drop
                  onDrop={this.logoChange}
                  multiple={false}
                > {
                  theme_logo === '' ? 
                  <Upload as='h2'>
                  Click or Drag to upload...
                  </Upload>
                  :
                  theme_logo && <Image size='medium' src={theme_logo.preview} />
                  }
                </Drop>
              </Form.Group>
              <Center>
              <Button textAlign='centered'>Submit</Button>
              </Center>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Divider hidden />
      </Grid>
    );
  }
}

const Drop = styled(Dropzone)`
  border: .5px dashed gray; 
  width: 100%;
  height: 200px;
  color: lightgray !important;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Upload = styled(Header)`
  color: lightgray !important;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    logo: settings.theme_logo,
  };
};

export default connect(mapStateToProps)(LogoUploader);