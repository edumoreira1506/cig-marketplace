import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import AppContext from '@Contexts/AppContext/AppContext';
import { AppState, INITIAL_STATE } from '@Contexts/AppContext/appReducer';
import { render } from './rtl';

export const createAppContextRenderer = (mockStore: AppState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  return (children: ReactNode) => render(
    <AppContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </AppContext.Provider>
  );
};


export const createAppContextHookRenderer = (mockStore: AppState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  const Provider = ({ children }: { children: ReactNode}) => (
    <AppContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </AppContext.Provider>
  );

  return (hook: any) => renderHook(hook, { wrapper: Provider });
};
