import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import createRegisterContextRenderer from '@Utils/tests/createRegisterContextRenderer';

import RegisterUserForm from '../RegisterUserForm';

const DEFAULT_PROPS = {
  onSubmit: jest.fn(),
  title: 'title'
};

describe('RegisterUserForm', () => {
  it('renders correctly', () => {
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

    render(<RegisterUserForm {...DEFAULT_PROPS} />);

    expect(screen.getByDisplayValue(mockStore.user.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.user.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.user.register)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.user.birthDate)).toBeInTheDocument();
  });

  it('calls onSubmit', () => {
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

    const onSubmit = jest.fn();

    render(<RegisterUserForm {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.next'))));

    expect(onSubmit).toHaveBeenCalled();
  });
});
