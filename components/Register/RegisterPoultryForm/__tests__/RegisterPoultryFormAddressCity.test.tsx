import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterPoultryFormAddressCity from '../RegisterPoultryFormAddressCity';

describe('RegisterPoultryFormAddressCity', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressCity />);

    expect(screen.getByText(String(i18next.t('poultry.fields.address.city')))).toBeInTheDocument();
  });

  it('renders the address.city value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          city: 'City example'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormAddressCity />);

    expect(screen.getByDisplayValue(mockStore.poultry.address.city)).toBeInTheDocument();
  });

  it('calls setPoultryAddressField when input value changes', () => {
    const city = 'a';
    const mockSetPoultryAddressField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressCity />);

    userEvent.type(screen.getByDisplayValue(''), city);

    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('city', city);
  });
});
