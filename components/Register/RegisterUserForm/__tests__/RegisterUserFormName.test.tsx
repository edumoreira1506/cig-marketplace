import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterUserFormName from '../RegisterUserFormName';

describe('RegisterUserFormName', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterUserFormName />);

    expect(screen.getByText(String(i18next.t('user.fields.name')))).toBeInTheDocument();
  });

  it('renders the name value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {
        ...INITIAL_STATE.user,
        name: 'name'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterUserFormName />);

    expect(screen.getByDisplayValue(mockStore.user.name)).toBeInTheDocument();
  });

  it('calls setUserField when input value changes', () => {
    const name = 'a';
    const mockSetUserField = jest.fn();

    jest.spyOn(registerActions, 'setUserField').mockImplementation(mockSetUserField);

    const render = createRegisterContextRenderer();

    render(<RegisterUserFormName />);

    userEvent.type(screen.getByDisplayValue(''), name);

    expect(mockSetUserField).toHaveBeenCalledWith('name', name);
  });
});
