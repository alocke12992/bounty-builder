import React from 'react';
import { clearFlash } from '../actions/flash';
import { connect } from 'react-redux';
import {
  Container,
  Divider,
  Message,
  Header,
} from 'semantic-ui-react';

const fadeFlash = (dispatch) => {
  setTimeout(() => {
    dispatch(clearFlash());
  }, 15000);
};

const Flash = ({ flash, dispatch }) => {
  if (flash.message) {
    window.scrollTo(0, 0);
    return (
      <Container>
        <Message
          onDismiss={() => dispatch(clearFlash())}
          color={flash.color}>
          <Header as="h5" textAlign="center">
            {flash.message}
          </Header>
          {fadeFlash(dispatch)}
        </Message>
        <Divider hidden />
      </Container>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  const { flash } = state;
  return { flash };
};

export default connect(mapStateToProps)(Flash);
