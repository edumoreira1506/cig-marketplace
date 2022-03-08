import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';

import RegisterBreederForm from '../RegisterBreederForm';

const DEFAULT_PROPS = {
  onSubmit: jest.fn(),
  title: 'title'
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

describe('RegisterBreederForm', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        name: 'name',
        description: 'description',
        address: {
          city: 'city',
          province: 'SP',
          zipcode: '123',
          street: 'street',
          number: 10
        }
      }
    };
    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederForm {...DEFAULT_PROPS} />);

    expect(screen.getByText(String(i18next.t('breeder.fields.address')))).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.code)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.address.city)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.address.province)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.address.zipcode)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.address.street)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.breeder.address.number)).toBeInTheDocument();
  });

  it('calls onSubmit', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        name: 'Example name'
      },
      dispatch: jest.fn()
    };
  
    const render = createRegisterContextRenderer(mockStore);

    const onSubmit = jest.fn();

    render(<RegisterBreederForm {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.register'))));

    expect(onSubmit).toHaveBeenCalled();
  });
});
