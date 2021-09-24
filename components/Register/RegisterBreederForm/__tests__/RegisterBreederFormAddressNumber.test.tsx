import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormAddressNumber from '../RegisterBreederFormAddressNumber';

describe('RegisterBreederFormAddressNumber', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressNumber />);

    expect(screen.getByText(String(i18next.t('breeder.fields.address.number')))).toBeInTheDocument();
  });

  it('renders the address.number value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        address: {
          ...INITIAL_STATE.breeder.address,
          number: 15,
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormAddressNumber />);

    expect(screen.getByDisplayValue(mockStore.breeder.address.number)).toBeInTheDocument();
  });

  it('calls setBreederAddressField when select value changes', () => {
    const number = 11;
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        address: {
          ...INITIAL_STATE.breeder.address,
          number: 1,
        }
      }
    };
    const mockSetBreederAddressField = jest.fn();

    jest.spyOn(registerActions, 'setBreederAddressField').mockImplementation(mockSetBreederAddressField);

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormAddressNumber />);

    userEvent.type(screen.getByDisplayValue(mockStore.breeder.address.number), String(number));

    expect(mockSetBreederAddressField).toHaveBeenCalledWith('number', number);
  });
});
