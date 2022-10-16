import styled from '@emotion/styled';
import {LayoutProps, layout, color, ColorProps, border, display, DisplayProps, BorderProps} from 'styled-system';
import Box, {BoxProps} from './Box';

const Flex = styled(Box)<BoxProps>`
  display: flex ${display};
`;

export default Flex;
