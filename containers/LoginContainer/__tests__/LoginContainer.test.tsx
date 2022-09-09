import i18next from 'i18next';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Hooks from '@cig-platform/hooks';

import { INITIAL_STATE } from '@Contexts/LoginContext/loginReducer';
import { createLoginContextRenderer } from '@Utils/tests/loginContextRenderer';
import AuthBffService from '@Services/AuthBffService';
import { BACKOFFICE_URL } from '@Constants/urls';

import LoginContainer from '../LoginContainer';

jest.mock('@cig-platform/hooks', () => ({
  useLocalStorage: jest.fn().mockReturnValue({
    set: jest.fn()
  })
}));

jest.mock('react-facebook-login/dist/facebook-login-render-props');

describe('LoginContainer', () => {
  it('renders correctly', () => {
    const render = createLoginContextRenderer();

    render(<LoginContainer />);

    expect(screen.getByText(String(i18next.t('common.sign-up')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('user.fields.email')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('user.fields.password')))).toBeInTheDocument();
  });

  it.skip('set token on local storage and reassign url after success login', async () => {
    const email = 'contato@eduardoem.com';
    const password = 'password';
    const token = 'token';
    const render = createLoginContextRenderer({ ...INITIAL_STATE, email, password });
    const mockLogin = jest.fn().mockResolvedValue({ ok: true, token });
    const mockSet = jest.fn();
    const mockUseLocalStorage = jest.fn().mockReturnValue({
      set: mockSet,
    });
    const mockAssign = jest.fn();

    jest.spyOn(AuthBffService, 'login').mockImplementation(mockLogin);
    jest.spyOn(Hooks, 'useLocalStorage').mockImplementation(mockUseLocalStorage);

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: mockAssign }
    });

    render(<LoginContainer />);

    userEvent.click(screen.getByText(String(i18next.t('common.enter'))));

    await waitFor(() => expect(mockSet).toHaveBeenCalledWith(token));

    expect(mockAssign).toHaveBeenCalledWith(`${BACKOFFICE_URL}?token=${token}`);
  });
});
