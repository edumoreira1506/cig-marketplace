import { screen, render } from '@testing-library/react';

import LoginLoading from '../LoginLoading';

describe('LoginLoading', () => {
  it('renders correctly', () => {
    render(<LoginLoading />);

    expect(screen.getByTestId('login-loading')).toBeInTheDocument();
  });
});
