import styled from 'styled-components';
import {Grid} from 'semantic-ui-react';


export default styled(Grid.Row) `
  padding-left: 0px !important;
  padding-right: 0px !important;
  height: 75px;
  &:hover {

    color: #4D4D4D;
  }
  &:active {
-webkit-box-shadow: inset -1px 1px 2px 1px rgba(125,125,125,0.68);
-moz-box-shadow: inset -1px 1px 2px 1px rgba(125,125,125,0.68);
box-shadow: inset -1px 1px 2px 1px rgba(125,125,125,0.68);
  }
`;
