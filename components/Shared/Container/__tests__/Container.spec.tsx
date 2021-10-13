import { screen } from '@testing-library/react';

import * as Alert from '@Utils/alert';
import { INITIAL_STATE } from '@Contexts/AppContext/appReducer';
import { createAppContextRenderer } from '@Utils/tests/appContextRenderer';
import { createRouterWrapper } from '@Utils/tests/wrappers';

import Container from '../Container';

const DEFAULT_PROPS = {
  children: 'I am the children!'
};

describe('Container', () => {
  it('shows the error when get an error', () => {
    const mockStore = {
      ...INITIAL_STATE,
      error: {
        message: 'Error message',
        name: 'ErrorName',
        getError: jest.fn()
      }
    };

    const mockShowError = jest.fn();

    jest.spyOn(Alert, 'error').mockImplementation(mockShowError);

    const render = createAppContextRenderer(mockStore);
    const RouterWrapper = createRouterWrapper('/', '/');

    render(
      <RouterWrapper>
        <Container {...DEFAULT_PROPS} />
      </RouterWrapper>
    );

    expect(mockShowError).toHaveBeenCalled();
  });

  it('renders the children', () => {
    const children = 'Hello!';

    const RouterWrapper = createRouterWrapper('/', '/');
    const render = createAppContextRenderer();

    render(
      <RouterWrapper>
        <Container {...DEFAULT_PROPS}>
          {children}
        </Container>
      </RouterWrapper>
    );

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
