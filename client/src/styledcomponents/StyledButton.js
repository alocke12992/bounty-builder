import styled from 'styled-components';
import {Button} from 'semantic-ui-react';


export default styled(Button) `
background-color: ${ (props) => props.backgroundColor} !important;
color: ${(props) => props.fontColor} !important;
border: 1px solid !important;
border-color: ${(props) => props.border} !important;
`;