import styled from 'styled-components';
import { Colors, DEFAULT_BORDER_RADIUS } from '@cig-platform/ui';

export const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledContainer = styled.div`
  width: 80%;
  max-width: 350px;
  height: 300px;
  background-color: ${Colors.DarkGreyBlue};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledFormWrapper = styled.div`
  width: 80%;
  height: 80%;
`;
