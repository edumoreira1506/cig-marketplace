import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';

import RegisterBreederFormWhatsApp from '../RegisterBreederFormWhatsApp';

jest.mock('@cig-platform/ui', () => {
  const original = jest.requireActual('@cig-platform/ui');

  return {
    ...original,
    Input: ({ label, onChange, placeholder, value }: {
      label: string;
      onChange: (newValue: string) => void;
      placeholder: string;
      value: string;
    }) => (
      <>
        <label>{label}</label>
        <input value={value} type="text" onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </>
    )
  };
});

describe('RegisterBreederFormWhatsApp', () => {
  it('renders correctly', async () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormWhatsApp />);

    expect(await screen.findByText(String(i18next.t('breeder.fields.whats-app')))).toBeInTheDocument();
  });

  it('renders the whats-app value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      whatsApp: '(15) 99644-2031'
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormWhatsApp />);

    expect(screen.getByDisplayValue(mockStore.whatsApp)).toBeInTheDocument();
  });

  it('calls setWhatsApp when input value changes', () => {
    const whatsApp = '1';
    const mockSetWhatsApp = jest.fn();

    jest.spyOn(registerActions, 'setWhatsApp').mockImplementation(mockSetWhatsApp);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormWhatsApp />);

    userEvent.type(screen.getByDisplayValue(''), whatsApp);

    expect(mockSetWhatsApp).toHaveBeenCalledWith(whatsApp);
  });
});
