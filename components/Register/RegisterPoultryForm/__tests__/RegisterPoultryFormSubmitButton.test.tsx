import i18next from 'i18next';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';

import RegisterPoultryFormSubmitButton from '../RegisterPoultryFormSubmitButton';
import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
};

describe('RegisterPoultryFormSubmitButton', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormSubmitButton {...DEFAULT_PROPS} />);

    expect(screen.getByText(String(i18next.t('common.register')))).toBeInTheDocument();
  });

  it('calls onSubmit', () => {
    const onSubmit = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        name: 'Poultry name'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormSubmitButton {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.register'))));

    expect(onSubmit).toHaveBeenCalledWith({ user: mockStore.user, poultry: mockStore.poultry });
  });

  it('does not call onSubmit', () => {
    const onSubmit = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        name: ''
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormSubmitButton {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.register'))));

    expect(onSubmit).not.toHaveBeenCalledWith({ user: mockStore.user, poultry: mockStore.poultry });
  });
});
