import styled from 'styled-components';
import { Colors, MAIN_FONT } from '@cig-platform/ui';

export const StyledContainer = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

export const StyledLabel = styled.label`
  color: ${Colors.White};
  font-family: ${MAIN_FONT};
  font-weight: bold;
`;

export const StyledInputWrapper = styled.div`
  border-bottom: solid 2px ${Colors.White};
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledInput = styled.input`
  color: ${Colors.White};
  background: none;
  border: none;
  margin-top: 10px;
  width: 100%;
  
  &::placeholder {
    color: ${Colors.White};
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

export const StyledIcon = styled.div`
  transform: translateY(5px);
  color: ${Colors.White};
`;
