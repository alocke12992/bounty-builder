import React from 'react';
import { Container } from 'semantic-ui-react';

 const createMarkup = (html) => {
  return { __html: html };
};

const GenerateHtml = (props) => (
  <Container
    dangerouslySetInnerHTML={
      createMarkup(props.text)
    }
  />
);

export default GenerateHtml;