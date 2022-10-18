import styled from '@emotion/styled';
import {LayoutProps, layout, color, ColorProps, border, display, DisplayProps, BorderProps} from 'styled-system';
import Box, {BoxProps} from './Box';

const Flex = styled(Box)<BoxProps & {hoverable?: boolean}>`
  display: flex ${display};
  transition: all 0.6s;
  :hover {
    background-color: ${({hoverable}) => (hoverable ? ' #ccc' : '')};
    border-color: ${({hoverable}) => (hoverable ? ' #0066CC' : '')};
    color: ${({hoverable}) => (hoverable ? ' #0066CC' : '')};
  }
`;

export default Flex;
