import { useReducer, useMemo, ReactChild } from 'react';

import registerReducer, { INITIAL_STATE } from './registerReducer';
import RegisterContext from './RegisterContext';

export default function RegisterProvider({ children }: { children: ReactChild }) {
  const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);
  const store = useMemo(() => ({ ...state, dispatch }), [state]);

  return <RegisterContext.Provider value={store}>{children}</RegisterContext.Provider>;
}
