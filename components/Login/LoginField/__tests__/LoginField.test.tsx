import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@Utils/tests/rtl';

import LoginField from '../LoginField';

const DEFAULT_PROPS = {
  label: 'Label',
  value: 'Value',
  onChange: jest.fn(),
  type: 'email' as const
};

describe('LoginField', () => {
  it('renders the label', () => {
    const label = 'label';

    render(<LoginField {...DEFAULT_PROPS} label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders the input', () => {
    const value = 'value';

    render(<LoginField {...DEFAULT_PROPS} value={value} />);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const value = '';
    const onChange = jest.fn();
    const newValue = 'a';

    render(<LoginField {...DEFAULT_PROPS} onChange={onChange} value={value} />);

    userEvent.type(screen.getByDisplayValue(value), newValue);

    expect(onChange).toHaveBeenCalledWith(newValue);
  });
});
