import i18next from 'i18next';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as Alert from '@Utils/alert';

import RegisterContainer from '../RegisterContainer';

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

describe('RegisterContainer', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterContainer />);

    expect(screen.getByText(String(i18next.t('common.user')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('common.breeder')))).toBeInTheDocument();
  });

  it('changes to breeder tab when the user address is valid', () => {
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

    render(<RegisterContainer />);

    userEvent.click(screen.getByText(String(i18next.t('common.next'))));

    expect(screen.getByText(String(i18next.t('breeder.fields.address')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('breeder.fields.name')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('breeder.fields.description')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('breeder.fields.address.city')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('breeder.fields.address.province')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('breeder.fields.address.state')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('breeder.fields.address.zipcode')))).toBeInTheDocument();
    expect(screen.getByText(String(i18next.t('breeder.fields.address.number')))).toBeInTheDocument();
  });

  it('does not change to breeder tab when the user address is valid', () => {
    const render = createRegisterContextRenderer(INITIAL_STATE);

    render(<RegisterContainer />);

    userEvent.click(screen.getByText(String(i18next.t('common.next'))));

    expect(screen.queryByText(String(i18next.t('breeder.fields.address')))).not.toBeInTheDocument();
    expect(screen.queryByText(String(i18next.t('breeder.fields.description')))).not.toBeInTheDocument();
    expect(screen.queryByText(String(i18next.t('breeder.fields.address.city')))).not.toBeInTheDocument();
    expect(screen.queryByText(String(i18next.t('breeder.fields.address.province')))).not.toBeInTheDocument();
    expect(screen.queryByText(String(i18next.t('breeder.fields.address.state')))).not.toBeInTheDocument();
    expect(screen.queryByText(String(i18next.t('breeder.fields.address.zipcode')))).not.toBeInTheDocument();
    expect(screen.queryByText(String(i18next.t('breeder.fields.address.number')))).not.toBeInTheDocument();
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

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterContainer />);

    expect(mockShowError).toHaveBeenCalled();
  });
});
