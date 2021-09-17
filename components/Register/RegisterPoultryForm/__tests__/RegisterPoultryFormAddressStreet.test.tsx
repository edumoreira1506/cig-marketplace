import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterPoultryFormAddressStreet from '../RegisterPoultryFormAddressStreet';

describe('RegisterPoultryFormAddressStreet', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressStreet />);

    expect(screen.getByText(String(i18next.t('poultry.fields.address.street')))).toBeInTheDocument();
  });

  it('renders the address.street value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          street: 'Street example'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormAddressStreet />);

    expect(screen.getByDisplayValue(mockStore.poultry.address.street)).toBeInTheDocument();
  });

  it('calls setPoultryAddressField when input value changes', () => {
    const street = 'a';
    const mockSetPoultryAddressField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressStreet />);

    userEvent.type(screen.getByDisplayValue(''), street);

    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('street', street);
  });
});
