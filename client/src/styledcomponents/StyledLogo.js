import styled from 'styled-components';
import {Image} from 'semantic-ui-react';

const imageSize = (size) => {
  switch (size) {
    case 'tablet':
      return '70px'
    case 'mobile':
      return '50px';
    default:
      return '60px';
  }
}

export default styled(Image) `
  height: ${ props => imageSize(props.iSize)} !important; 
`