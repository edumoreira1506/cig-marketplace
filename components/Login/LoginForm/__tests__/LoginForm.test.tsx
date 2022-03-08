import i18next from 'i18next';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { INITIAL_STATE } from '@Contexts/LoginContext/loginReducer';
import { createLoginContextRenderer } from '@Utils/tests/loginContextRenderer';
import * as actions from '@Contexts/LoginContext/loginActions';

import LoginForm from '../LoginForm';

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
};

jest.mock('react-facebook-login/dist/facebook-login-render-props');

describe('LoginForm', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      email: 'email',
      password: 'password'
    };
    const render = createLoginContextRenderer(mockStore);

    render(<LoginForm {...DEFAULT_PROPS} />);

    expect(screen.getByText(String(i18next.t('common.enter')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('user.fields.email')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('user.fields.password')))).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.password)).toBeInTheDocument();
  });

  it('renders the loading', () => {
    const mockStore = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    const render = createLoginContextRenderer(mockStore);

    render(<LoginForm {...DEFAULT_PROPS} />);

    expect(screen.getByTestId('login-loading')).toBeInTheDocument();
  });

  it('calls setEmail', () => {
    const mockSetEmail = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      email: 'teste@email.co'
    };
    const newEmail = 'teste@email.com';
    const render = createLoginContextRenderer(mockStore);

    jest.spyOn(actions, 'setEmail').mockImplementation(mockSetEmail);

    render(<LoginForm {...DEFAULT_PROPS} />);

    userEvent.type(screen.getByDisplayValue(mockStore.email), newEmail);

    expect(mockSetEmail).toHaveBeenCalledWith(newEmail);
  });

  it('calls setPassword', () => {
    const mockSetPassword = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      password: 'senh'
    };
    const newPassword = 'senha';
    const render = createLoginContextRenderer(mockStore);

    jest.spyOn(actions, 'setPassword').mockImplementation(mockSetPassword);

    render(<LoginForm {...DEFAULT_PROPS} />);

    userEvent.type(screen.getByDisplayValue(mockStore.password), newPassword);

    expect(mockSetPassword).toHaveBeenCalledWith(newPassword);
  });

  it('calls onSubmit', () => {
    const onSubmit = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      password: 'password',
      email: 'email@teste.com'
    };
    const render = createLoginContextRenderer(mockStore);

    render(<LoginForm {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.enter'))));

    expect(onSubmit).toHaveBeenCalledWith(mockStore.email, mockStore.password);
  });
});
