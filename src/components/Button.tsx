import styled from '@emotion/styled';
import {layout, color, border, display, flexbox, typography, space, position} from 'styled-system';
import {BoxProps} from './Box';

const Button = styled.button<BoxProps>`
background-color: white;
border: #ccc solid 1px;
height: 32px;
width: 64px;
transition: all 0.5s;
:hover{
  background-color: #ccc;
  border-color:#0066CC;
  color: #0066CC;
}
  ${layout}
  ${color}
  ${border}
  ${display}
  ${flexbox}
  ${typography}
  ${space}
  ${position}
`;

export default Button;
