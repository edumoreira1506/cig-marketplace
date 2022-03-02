import styled from 'styled-components';
import { DEFAULT_BORDER_RADIUS } from '@cig-platform/ui';

export const StyledFacebookButton = styled.button`
  background-color: #3b5998;
  width: 100%;
  cursor: pointer;
  border: none;
  padding: 10px 0;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  border-radius: ${DEFAULT_BORDER_RADIUS};
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    font-size: 1.5em;
    margin-left: 12px;
  }
`;
