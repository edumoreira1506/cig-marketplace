import styled from 'styled-components';
import { createMinWidthMediaQuery } from '@cig-platform/ui';

export const StyledPage = styled.div`
  padding: 12px 15px 0;

  ${createMinWidthMediaQuery(`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 100vh;
  `)}
`;

export const StyledRegisterSection = styled.section`
  ${createMinWidthMediaQuery(`
    width: 40%;
    height: 70%;
    display: flex;
    flex-direction: column;
  `)}
`;

export const StyledTitleWrapper = styled.div`
  ${createMinWidthMediaQuery(`
    margin-bottom: 30px;
  `)}
`;
