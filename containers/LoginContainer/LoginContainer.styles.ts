import styled from 'styled-components';
import { Colors } from '@cig-platform/ui';

export const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 85%;
`;

export const StyledLink = styled.div`
  color: ${Colors.White};
  text-decoration: underline;
  font-size: 0.8em;
`;
