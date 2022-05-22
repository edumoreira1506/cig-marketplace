import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';

import RegisterUserForm from '../RegisterUserForm';

const DEFAULT_PROPS = {
  onSubmit: jest.fn(),
  title: 'title',
  onGetFacebookData: jest.fn(),
  onGetGoogleData: jest.fn()
};

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = ({ label, onChange, placeholder, value }: {
    label: string;
    onChange: (newValue: string) => void;
    placeholder: string;
    value: string;
  }) => (
    <>
      <label>{label}</label>
      <input value={value} type="text" onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </>
  );
  DynamicComponent.displayName = 'DynamicComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

jest.mock('react-facebook-login/dist/facebook-login-render-props');

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
    expect(screen.getByDisplayValue(new Date(mockStore.user.birthDate).toLocaleDateString('en-US'))).toBeInTheDocument();
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
