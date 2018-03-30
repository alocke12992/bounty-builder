import React from 'react';
import ButtonColor from './ButtonColor';
import LogoUploader from './LogoUploader';
import NavColor from './NavColor';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Button, Divider, Grid} from 'semantic-ui-react';

class ThemeOptions extends React.Component {

  state = {
    activeItem: ''
  };

  handleItemClick = (e, {name}) => {
    let {activeItem} = this.state
    if (activeItem === '') {
      this.setState({activeItem: name})
    } else {
      this.setState({activeItem: ''})
    }
  }

  close = () => {
    this.setState({activeItem: ''})
  }

  navColor = () => {
    return <NavColor close={this.close} />
  }

  buttonColor = () => {
    return <ButtonColor close={this.close} />
  }

  logoUploader = () => {
    return <LogoUploader close={this.close} />
  }

  render() {
    const {activeItem} = this.state
    const {buttonColor} = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            {buttons.map((button, i) => {
              return (
                <div>
                  <Divider hidden />
                  <Grid.Row key={button.i}>
                    <StyledButton
                      themecolor={buttonColor}
                      name={button.name}
                      onClick={this.handleItemClick}
                    >
                      {button.name}
                    </StyledButton>
                  </Grid.Row>
                </div>
              )
            })}
          </Grid.Column>
          {activeItem === 'Nav' && this.navColor()}
          {activeItem === 'Button' && this.buttonColor()}
          {activeItem === 'Logo' && this.logoUploader()}
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    buttonColor: state.settings.button_color,
  };
};

const StyledButton = styled(Button) `
background-color: ${ (props) => props.themecolor} !important;
`;

const buttons = [
  {
    name: 'Nav'
  },
  {
    name: 'Button'
  },
  {
    name: 'Logo'
  }
]

export default connect(mapStateToProps)(ThemeOptions);
