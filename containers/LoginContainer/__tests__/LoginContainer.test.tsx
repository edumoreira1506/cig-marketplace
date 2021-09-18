import i18next from 'i18next';
import { screen } from '@testing-library/react';

import * as Alert from '@Utils/alert';
import { INITIAL_STATE } from '@Contexts/LoginContext/loginReducer';
import { createLoginContextRenderer } from '@Utils/tests/loginContextRenderer';

import LoginContainer from '../LoginContainer';

describe('LoginContainer', () => {
  it('renders correctly', () => {
    const render = createLoginContextRenderer();

    render(<LoginContainer />);

    expect(screen.getByText(String(i18next.t('common.sign-up')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('user.fields.email')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('user.fields.password')))).toBeInTheDocument();
  });

  it('shows the error when get an error', () => {
    const mockStore = {
      ...INITIAL_STATE,
      error: {
        message: 'Error message',
        name: 'ErrorName',
        getError: jest.fn()
      }
    };

    const mockShowError = jest.fn();

    jest.spyOn(Alert, 'error').mockImplementation(mockShowError);

    const render = createLoginContextRenderer(mockStore);

    render(<LoginContainer />);

    expect(mockShowError).toHaveBeenCalled();
  });
});
