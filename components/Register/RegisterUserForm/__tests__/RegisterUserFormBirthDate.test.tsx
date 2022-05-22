import { screen } from '@testing-library/react';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';

import RegisterUserFormBirthDate from '../RegisterUserFormBirthDate';

describe('RegisterUserFormBirthDate', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterUserFormBirthDate />);

    expect(screen.getByText(String(i18next.t('user.fields.birth-date')))).toBeInTheDocument();
  });

  it('renders the birth date value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {
        ...INITIAL_STATE.user,
        birthDate: '2001-01-01'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterUserFormBirthDate />);

    expect(screen.getByDisplayValue('01/01/2001')).toBeInTheDocument();
  });
});
