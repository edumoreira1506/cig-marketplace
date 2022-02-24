import styled from 'styled-components';

export const StyledContainer = styled.section`
  width: 100%;
`;

export const StyledAdvertisings = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const StyledAdvertising = styled.li`
  list-style: none;
  margin-bottom: 15px;
  width: 100%;

  @media (min-width: 768px) {
    width: 33%;
  }
`;
