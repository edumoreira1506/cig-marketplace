import i18next from 'i18next';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';

import RegisterUserFormSubmitButton from '../RegisterUserFormSubmitButton';
import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
};

describe('RegisterUserFormSubmitButton', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterUserFormSubmitButton {...DEFAULT_PROPS} />);

    expect(screen.getByText(String(i18next.t('common.next')))).toBeInTheDocument();
  });

  it('calls onSubmit', () => {
    const onSubmit = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      user: {
        ...INITIAL_STATE.user,
        confirmPassword: 'password',
        password: 'password',
        email: 'email@teste.com',
        name: 'Name',
        register: '123',
        birthDate: '2000-01-01'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterUserFormSubmitButton {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.next'))));

    expect(onSubmit).toHaveBeenCalledWith();
  });

  it('does not call onSubmit', () => {
    const onSubmit = jest.fn();

    const render = createRegisterContextRenderer(INITIAL_STATE);

    render(<RegisterUserFormSubmitButton {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.next'))));

    expect(onSubmit).not.toHaveBeenCalledWith();
  });
});
