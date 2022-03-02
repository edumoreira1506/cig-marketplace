import { Colors, DEFAULT_BORDER_RADIUS, MAIN_FONT } from '@cig-platform/ui';
import styled from 'styled-components';

export const StyledForm = styled.form`
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
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const StyledSocialMediaButtons = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 70px;
`;

export const StyledFacebookButton = styled.button`
  background-color: #3b5998;
  cursor: pointer;
  color: ${Colors.White};
  border-radius: 100%;
  border: none;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
`;

export const StyledGoogleButton = styled.button`
  background-color: ${Colors.White};
  cursor: pointer;
  color: rgba(0, 0, 0, 0.54);
  border-radius: 100%;
  border: none;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
`;
