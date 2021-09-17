import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import createRegisterContextRenderer from '@Utils/tests/createRegisterContextRenderer';

import RegisterPoultryForm from '../RegisterPoultryForm';

const DEFAULT_PROPS = {
  onSubmit: jest.fn(),
  title: 'title'
};

describe('RegisterPoultryForm', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        name: 'name',
        description: 'description',
        address: {
          city: 'city',
          province: 'SP',
          zipcode: '123',
          street: 'street'
        }
      }
    };
    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryForm {...DEFAULT_PROPS} />);

    expect(screen.getByText(String(i18next.t('poultry.fields.address')))).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.poultry.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.poultry.description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.poultry.address.city)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.poultry.address.province)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.poultry.address.zipcode)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockStore.poultry.address.street)).toBeInTheDocument();
  });

  it('calls onSubmit', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        name: 'Example name'
      },
      dispatch: jest.fn()
    };
  
    const render = createRegisterContextRenderer(mockStore);

    const onSubmit = jest.fn();

    render(<RegisterPoultryForm {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.register'))));

    expect(onSubmit).toHaveBeenCalled();
  });
});
