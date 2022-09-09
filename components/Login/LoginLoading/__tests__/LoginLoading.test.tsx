import { screen } from '@testing-library/react';
import { render } from '@Utils/tests/rtl';

import LoginLoading from '../LoginLoading';

describe('LoginLoading', () => {
  it('renders correctly', () => {
    render(<LoginLoading />);

    expect(screen.getByTestId('login-loading')).toBeInTheDocument();
  });
});
