import { Colors, MAIN_FONT } from '@cig-platform/ui';
import styled, { createGlobalStyle, css } from 'styled-components';
import ReactSlider from 'react-slider';

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

export const PriceFilterStyle = createGlobalStyle`
  .slider-track {
    background-color: ${Colors.DarkBlue};
    height: 4px;
    transform: translateY(7px);
  }
`;

export const StyledPriceFilterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px;
`;

export const StyledPrice = styled.div`
  margin: 0;
  font-weight: 600;
  font-family: ${MAIN_FONT};
`;

export const StyledPriceInput = styled.input`
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: solid 1px ${Colors.DarkBlue};
  width: 100px;

  ${({ textAlign = 'left' }: { textAlign?: string; }) => css`
    text-align: ${textAlign};
  `}

  &:focus {
    outline: none;
  }
`;

export const StyledPriceFilter = styled(ReactSlider)`
  width: 100%;
  height: 30px;
  margin-top: 10px;
`;

export const StyledPriceDot = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${Colors.DarkBlue};
  display: block;
  border-radius: 100%;
  border: solid 3px ${Colors.LightGrey};
`;
