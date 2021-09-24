import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormName from '../RegisterBreederFormName';

describe('RegisterBreederFormName', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormName />);

    expect(screen.getByText(String(i18next.t('breeder.fields.name')))).toBeInTheDocument();
  });

  it('renders the name value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        name: 'name'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormName />);

    expect(screen.getByDisplayValue(mockStore.breeder.name)).toBeInTheDocument();
  });

  it('calls setBreederField when input value changes', () => {
    const name = '1';
    const mockSetBreederField = jest.fn();

    jest.spyOn(registerActions, 'setBreederField').mockImplementation(mockSetBreederField);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormName />);

    userEvent.type(screen.getByDisplayValue(''), name);

    expect(mockSetBreederField).toHaveBeenCalledWith('name', name);
  });
});
