import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormCode from '../RegisterBreederFormCode';

describe('RegisterBreederFormCode', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormCode />);

    expect(screen.getByText(String(i18next.t('breeder.fields.code')))).toBeInTheDocument();
  });

  it('renders the name value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        code: 'ABCD'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormCode />);

    expect(screen.getByDisplayValue(mockStore.breeder.code)).toBeInTheDocument();
  });

  it('calls setBreederField when input value changes', () => {
    const code = 'A';
    const mockSetBreederField = jest.fn();

    jest.spyOn(registerActions, 'setBreederField').mockImplementation(mockSetBreederField);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormCode />);

    userEvent.type(screen.getByDisplayValue(''), code);

    expect(mockSetBreederField).toHaveBeenCalledWith('code', code);
  });
});
