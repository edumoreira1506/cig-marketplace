import styled from 'styled-components';
import { createMinWidthMediaQuery } from '@cig-platform/ui';

export const StyledLoading = styled.div`
  position: fixed;
  top: 80%;
  transform: scale(0.5);
  left: 30%;

  ${createMinWidthMediaQuery(`
    left: 47%;
  `)}
`;
