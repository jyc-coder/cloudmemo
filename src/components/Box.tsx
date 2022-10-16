import styled from '@emotion/styled';
import {
  LayoutProps,
  layout,
  color,
  ColorProps,
  border,
  display,
  DisplayProps,
  BorderProps,
  FlexboxProps,
  flexbox,
  typography,
  TypographyProps,
  space,
  SpaceProps,
  position,
  PositionProps,
} from 'styled-system';

export type BoxProps = LayoutProps &
  ColorProps &
  DisplayProps &
  BorderProps &
  FlexboxProps &
  TypographyProps &
  SpaceProps &
  PositionProps;

const Box = styled.div<BoxProps>`
  ${layout}
  ${color}
  ${border}
  ${display}
  ${flexbox}
  ${typography}
  ${space}
  ${position}
`;

export default Box;
