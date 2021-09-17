import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { INITIAL_STATE, RegisterState } from '@Contexts/RegisterContext/registerReducer';
import RegisterContext from '@Contexts/RegisterContext/RegisterContext';

export const createRegisterContextRenderer = (mockStore: RegisterState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  return (children: ReactNode) => render(
    <RegisterContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const createRegisterContextHookRenderer = (mockStore: RegisterState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  const Provider = ({ children }: { children: ReactNode}) => (
    <RegisterContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </RegisterContext.Provider>
  );

  return (hook: any) => renderHook(hook, { wrapper: Provider });
};
