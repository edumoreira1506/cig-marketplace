import { Colors, DEFAULT_BORDER_RADIUS, MAIN_FONT } from '@cig-platform/ui';
import styled from 'styled-components';

export const StyledForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledSubmitButton = styled.button`
  width: 80px;
  height: 25px;
  color: ${Colors.DarkGreyBlue};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  border: none;
  font-weight: bold;
  font-family: ${MAIN_FONT};

  &:focus {
    outline: none;
  }
`;
