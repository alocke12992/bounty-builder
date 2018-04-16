import styled from 'styled-components';

export default styled.section`
  padding: 4em;
  background: ${(props) => props.color};
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;