import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormAddressStreet from '../RegisterBreederFormAddressStreet';

describe('RegisterBreederFormAddressStreet', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressStreet />);

    expect(screen.getByText(String(i18next.t('breeder.fields.address.street')))).toBeInTheDocument();
  });

  it('renders the address.street value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        address: {
          ...INITIAL_STATE.breeder.address,
          street: 'Street example'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormAddressStreet />);

    expect(screen.getByDisplayValue(mockStore.breeder.address.street)).toBeInTheDocument();
  });

  it('calls setBreederAddressField when input value changes', () => {
    const street = 'a';
    const mockSetBreederAddressField = jest.fn();

    jest.spyOn(registerActions, 'setBreederAddressField').mockImplementation(mockSetBreederAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressStreet />);

    userEvent.type(screen.getByDisplayValue(''), street);

    expect(mockSetBreederAddressField).toHaveBeenCalledWith('street', street);
  });
});
