import i18next from 'i18next';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';

import RegisterBreederFormSubmitButton from '../RegisterBreederFormSubmitButton';
import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
};

describe('RegisterBreederFormSubmitButton', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormSubmitButton {...DEFAULT_PROPS} />);

    expect(screen.getByText(String(i18next.t('common.register')))).toBeInTheDocument();
  });

  it('calls onSubmit', () => {
    const onSubmit = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        name: 'Breeder name'
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormSubmitButton {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.register'))));

    expect(onSubmit).toHaveBeenCalledWith({ user: mockStore.user, breeder: mockStore.breeder });
  });

  it('does not call onSubmit', () => {
    const onSubmit = jest.fn();
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        name: ''
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormSubmitButton {...DEFAULT_PROPS} onSubmit={onSubmit} />);

    userEvent.click(screen.getByText(String(i18next.t('common.register'))));

    expect(onSubmit).not.toHaveBeenCalledWith({ user: mockStore.user, breeder: mockStore.breeder });
  });
});
