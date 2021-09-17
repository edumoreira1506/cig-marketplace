import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import createRegisterContextRenderer from '@Utils/tests/createRegisterContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterUserFormPassword from '../RegisterUserFormPassword';

describe('RegisterUserFormPassword', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterUserFormPassword />);

    expect(screen.getByText(String(i18next.t('user.fields.password')))).toBeInTheDocument();
  });

  it('renders the password value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {
        ...INITIAL_STATE.user,
        password: 'password'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterUserFormPassword />);

    expect(screen.getByDisplayValue(mockStore.user.password)).toBeInTheDocument();
  });

  it('calls setUserField when input value changes', () => {
    const password = 'a';
    const mockSetUserField = jest.fn();

    jest.spyOn(registerActions, 'setUserField').mockImplementation(mockSetUserField);

    const render = createRegisterContextRenderer();

    render(<RegisterUserFormPassword />);

    userEvent.type(screen.getByDisplayValue(''), password);

    expect(mockSetUserField).toHaveBeenCalledWith('password', password);
  });
});
