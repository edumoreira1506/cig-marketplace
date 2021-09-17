import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterUserFormConfirmPassword from '../RegisterUserFormConfirmPassword';

describe('RegisterUserFormConfirmPassword', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterUserFormConfirmPassword />);

    expect(screen.getByText(String(i18next.t('user.fields.confirm-password')))).toBeInTheDocument();
  });

  it('renders the confirm password value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {
        ...INITIAL_STATE.user,
        confirmPassword: 'confirm'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterUserFormConfirmPassword />);

    expect(screen.getByDisplayValue(mockStore.user.confirmPassword)).toBeInTheDocument();
  });

  it('calls setUserField when input value changes', () => {
    const confirmPassword = 'a';
    const mockSetUserField = jest.fn();

    jest.spyOn(registerActions, 'setUserField').mockImplementation(mockSetUserField);

    const render = createRegisterContextRenderer();

    render(<RegisterUserFormConfirmPassword />);

    userEvent.type(screen.getByDisplayValue(''), confirmPassword);

    expect(mockSetUserField).toHaveBeenCalledWith('confirmPassword', confirmPassword);
  });
});
