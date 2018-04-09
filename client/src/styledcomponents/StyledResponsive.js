import styled from 'styled-components';
import {Responsive} from 'semantic-ui-react';

const maxWidth = (size) => {
  switch (size) {
    case 'tablet':
      return '991'
    case 'mobile':
      return '767';
    default:
      return '';
  }
}

export default styled(Image) `
  height: ${ props => imageSize(props.iSize)} !important;
`