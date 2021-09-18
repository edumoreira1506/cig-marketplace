import { useReducer, useMemo, ReactChild } from 'react';

import loginReducer, { INITIAL_STATE } from './loginReducer';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }: { children: ReactChild }) {
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
  const store = useMemo(() => ({ ...state, dispatch }), [state]);

  return <LoginContext.Provider value={store}>{children}</LoginContext.Provider>;
}
