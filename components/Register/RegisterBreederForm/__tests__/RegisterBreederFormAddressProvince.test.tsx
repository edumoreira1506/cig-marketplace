import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormAddressProvince from '../RegisterBreederFormAddressProvince';

describe('RegisterBreederFormAddressProvince', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressProvince />);

    expect(screen.getByText(String(i18next.t('breeder.fields.address.province')))).toBeInTheDocument();
  });

  it('renders the address.province value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        address: {
          ...INITIAL_STATE.breeder.address,
          province: 'SP'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormAddressProvince />);

    expect(screen.getByDisplayValue(mockStore.breeder.address.province)).toBeInTheDocument();
  });

  it('calls setBreederAddressField when select value changes', () => {
    const province = 'SP';
    const mockSetBreederAddressField = jest.fn();

    jest.spyOn(registerActions, 'setBreederAddressField').mockImplementation(mockSetBreederAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressProvince />);

    userEvent.selectOptions(screen.getByTestId('register-form-breeder-address-province'), [province]);

    expect(mockSetBreederAddressField).toHaveBeenCalledWith('province', province);
  });
});
