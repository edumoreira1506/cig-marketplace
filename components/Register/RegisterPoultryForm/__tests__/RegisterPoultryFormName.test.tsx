import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterPoultryFormName from '../RegisterPoultryFormName';

describe('RegisterPoultryFormName', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormName />);

    expect(screen.getByText(String(i18next.t('poultry.fields.name')))).toBeInTheDocument();
  });

  it('renders the name value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        name: 'name'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormName />);

    expect(screen.getByDisplayValue(mockStore.poultry.name)).toBeInTheDocument();
  });

  it('calls setPoultryField when input value changes', () => {
    const name = '1';
    const mockSetPoultryField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryField').mockImplementation(mockSetPoultryField);

    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormName />);

    userEvent.type(screen.getByDisplayValue(''), name);

    expect(mockSetPoultryField).toHaveBeenCalledWith('name', name);
  });
});
