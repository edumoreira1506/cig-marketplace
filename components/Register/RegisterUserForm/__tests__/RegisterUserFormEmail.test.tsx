import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterUserFormEmail from '../RegisterUserFormEmail';

describe('RegisterUserFormEmail', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterUserFormEmail />);

    expect(screen.getByText(String(i18next.t('user.fields.email')))).toBeInTheDocument();
  });

  it('renders the email value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {
        ...INITIAL_STATE.user,
        email: 'email'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterUserFormEmail />);

    expect(screen.getByDisplayValue(mockStore.user.email)).toBeInTheDocument();
  });

  it('calls setUserField when input value changes', () => {
    const email = 'a';
    const mockSetUserField = jest.fn();

    jest.spyOn(registerActions, 'setUserField').mockImplementation(mockSetUserField);

    const render = createRegisterContextRenderer();

    render(<RegisterUserFormEmail />);

    userEvent.type(screen.getByDisplayValue(''), email);

    expect(mockSetUserField).toHaveBeenCalledWith('email', email);
  });
});
