import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { INITIAL_STATE, LoginState } from '@Contexts/LoginContext/loginReducer';
import LoginContext from '@Contexts/LoginContext/LoginContext';

export const createLoginContextRenderer = (mockStore: LoginState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  return (children: ReactNode) => render(
    <LoginContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </LoginContext.Provider>
  );
};

export const createLoginContextHookRenderer = (mockStore: LoginState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  const Provider = ({ children }: { children: ReactNode}) => (
    <LoginContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </LoginContext.Provider>
  );

  return (hook: any) => renderHook(hook, { wrapper: Provider });
};
