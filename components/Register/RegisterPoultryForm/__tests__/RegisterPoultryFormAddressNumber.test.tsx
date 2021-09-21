import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterPoultryFormAddressNumber from '../RegisterPoultryFormAddressNumber';

describe('RegisterPoultryFormAddressNumber', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressNumber />);

    expect(screen.getByText(String(i18next.t('poultry.fields.address.number')))).toBeInTheDocument();
  });

  it('renders the address.number value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          number: 15,
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormAddressNumber />);

    expect(screen.getByDisplayValue(mockStore.poultry.address.number)).toBeInTheDocument();
  });

  it('calls setPoultryAddressField when select value changes', () => {
    const number = 11;
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          number: 1,
        }
      }
    };
    const mockSetPoultryAddressField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormAddressNumber />);

    userEvent.type(screen.getByDisplayValue(mockStore.poultry.address.number), String(number));

    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('number', number);
  });
});
