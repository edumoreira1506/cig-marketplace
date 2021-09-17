import { render } from '@testing-library/react';
import { ReactNode } from 'react';

import { INITIAL_STATE, RegisterState } from '@Contexts/RegisterContext/registerReducer';
import RegisterContext from '@Contexts/RegisterContext/RegisterContext';

export default function createRegisterContextRenderer(mockStore: RegisterState = INITIAL_STATE, mockDispatch = jest.fn()) {
  return (children: ReactNode) => render(
    <RegisterContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </RegisterContext.Provider>
  );
}
