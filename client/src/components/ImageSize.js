import styled from 'styled-components';

const imageSize = (size) => {
  switch (size) {
    case 'large':
      return '150px'
    case 'medium':
      return '60px'
    case 'small':
      return '50px'
    default:
      return '75px'
  }
}

export default styled.img`
  height: ${ props => imageSize(props.iSize)} !important;
  width: auto
`