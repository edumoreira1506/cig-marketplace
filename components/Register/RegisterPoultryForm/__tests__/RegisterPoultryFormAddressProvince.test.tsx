import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import createRegisterContextRenderer from '@Utils/tests/createRegisterContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterPoultryFormAddressProvince from '../RegisterPoultryFormAddressProvince';

describe('RegisterPoultryFormAddressProvince', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressProvince />);

    expect(screen.getByText(String(i18next.t('poultry.fields.address.province')))).toBeInTheDocument();
  });

  it('renders the address.province value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          province: 'SP'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormAddressProvince />);

    expect(screen.getByDisplayValue(mockStore.poultry.address.province)).toBeInTheDocument();
  });

  it('calls setPoultryAddressField when select value changes', () => {
    const province = 'SP';
    const mockSetPoultryAddressField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressProvince />);

    userEvent.selectOptions(screen.getByTestId('register-form-poultry-address-province'), [province]);

    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('province', province);
  });
});
