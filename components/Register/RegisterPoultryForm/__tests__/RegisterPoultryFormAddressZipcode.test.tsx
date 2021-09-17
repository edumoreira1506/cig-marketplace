import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import createRegisterContextRenderer from '@Utils/tests/createRegisterContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterPoultryFormAddressZipcode from '../RegisterPoultryFormAddressZipcode';

describe('RegisterPoultryFormAddressZipcode', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressZipcode />);

    expect(screen.getByText(String(i18next.t('poultry.fields.address.zipcode')))).toBeInTheDocument();
  });

  it('renders the address.zipcode value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          zipcode: '123'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormAddressZipcode />);

    expect(screen.getByDisplayValue(mockStore.poultry.address.zipcode)).toBeInTheDocument();
  });

  it('calls setPoultryAddressField when input value changes', () => {
    const zipcode = '1';
    const mockSetPoultryAddressField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressZipcode />);

    userEvent.type(screen.getByDisplayValue(''), zipcode);

    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('zipcode', zipcode);
  });
});
