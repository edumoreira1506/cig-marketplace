import { Colors } from '@cig-platform/ui';
import styled from 'styled-components';

export const StyledContainer = styled.section`
  width: 100%;
`;

export const StyledFilters = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StyledFilter = styled.div`
  width: calc(50% - 2px);
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

export const StyledFilterModalContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledFilterModalItem = styled.li`
  &:first-child {
    border-top: solid 1px ${Colors.DarkGrey};
  }
`;

export const StyledConfirmButton = styled.div`
  width: 100%;
`;
