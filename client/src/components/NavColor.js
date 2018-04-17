import React, {Fragment} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {SketchPicker} from 'react-color';
import {updateSettings} from '../actions/settings'
import {Grid, Segment, Divider, Header} from 'semantic-ui-react';
import Wrapper from '../styledcomponents/StyledBackground';

class NavColor extends React.Component {

  navChange = (navColor) => {
    const {dispatch, id} = this.props
    const color = {theme_nav_color: navColor.hex, id}
    dispatch(updateSettings(color))
  };

  render() {
    const {navColor} = this.props;
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row centered>
          <Grid.Column width={7}>
            <Header textAlign='center'>Choose Nav Color</Header>
            <Divider />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <SketchPicker
              color={navColor}
              onChangeComplete={this.navChange}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment textAlign='center' basic>
              <h3>Nav Color</h3>
              <Divider />
              <Wrapper color={navColor}>
              </Wrapper>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Divider hidden />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    navColor: settings.theme_nav_color,
  };
};

export default connect(mapStateToProps)(NavColor);