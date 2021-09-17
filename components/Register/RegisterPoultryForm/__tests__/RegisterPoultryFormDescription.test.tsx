import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterPoultryFormDescription from '../RegisterPoultryFormDescription';

describe('RegisterPoultryFormDescription', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormDescription />);

    expect(screen.getByText(String(i18next.t('poultry.fields.description')))).toBeInTheDocument();
  });

  it('renders the description value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        description: 'description'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormDescription />);

    expect(screen.getByDisplayValue(mockStore.poultry.description)).toBeInTheDocument();
  });

  it('calls setPoultryField when input value changes', () => {
    const description = '1';
    const mockSetPoultryField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryField').mockImplementation(mockSetPoultryField);

    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormDescription />);

    userEvent.type(screen.getByDisplayValue(''), description);

    expect(mockSetPoultryField).toHaveBeenCalledWith('description', description);
  });
});
