import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormDescription from '../RegisterBreederFormDescription';

describe('RegisterBreederFormDescription', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormDescription />);

    expect(screen.getByText(String(i18next.t('breeder.fields.description')))).toBeInTheDocument();
  });

  it('renders the description value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        description: 'description'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormDescription />);

    expect(screen.getByDisplayValue(mockStore.breeder.description)).toBeInTheDocument();
  });

  it('calls setBreederField when input value changes', () => {
    const description = '1';
    const mockSetBreederField = jest.fn();

    jest.spyOn(registerActions, 'setBreederField').mockImplementation(mockSetBreederField);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormDescription />);

    userEvent.type(screen.getByDisplayValue(''), description);

    expect(mockSetBreederField).toHaveBeenCalledWith('description', description);
  });
});
