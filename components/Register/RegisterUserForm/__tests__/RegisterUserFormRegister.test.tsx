import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import createRegisterContextRenderer from '@Utils/tests/createRegisterContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterUserFormRegister from '../RegisterUserFormRegister';

describe('RegisterUserFormRegister', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterUserFormRegister />);

    expect(screen.getByText(String(i18next.t('user.fields.register')))).toBeInTheDocument();
  });

  it('renders the register value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {
        ...INITIAL_STATE.user,
        register: 'register'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterUserFormRegister />);

    expect(screen.getByDisplayValue(mockStore.user.register)).toBeInTheDocument();
  });

  it('calls setUserField when input value changes', () => {
    const register = 'a';
    const mockSetUserField = jest.fn();

    jest.spyOn(registerActions, 'setUserField').mockImplementation(mockSetUserField);

    const render = createRegisterContextRenderer();

    render(<RegisterUserFormRegister />);

    userEvent.type(screen.getByDisplayValue(''), register);

    expect(mockSetUserField).toHaveBeenCalledWith('register', register);
  });
});
