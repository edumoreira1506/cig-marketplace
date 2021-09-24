import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormAddressCity from '../RegisterBreederFormAddressCity';

describe('RegisterBreederFormAddressCity', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressCity />);

    expect(screen.getByText(String(i18next.t('breeder.fields.address.city')))).toBeInTheDocument();
  });

  it('renders the address.city value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        address: {
          ...INITIAL_STATE.breeder.address,
          city: 'City example'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormAddressCity />);

    expect(screen.getByDisplayValue(mockStore.breeder.address.city)).toBeInTheDocument();
  });

  it('calls setBreederAddressField when input value changes', () => {
    const city = 'a';
    const mockSetBreederAddressField = jest.fn();

    jest.spyOn(registerActions, 'setBreederAddressField').mockImplementation(mockSetBreederAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressCity />);

    userEvent.type(screen.getByDisplayValue(''), city);

    expect(mockSetBreederAddressField).toHaveBeenCalledWith('city', city);
  });
});
