import { Dispatch } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { INITIAL_STATE, LoginActionsType, LoginState } from './loginReducer';

export interface ILoginContext extends LoginState {
  dispatch: Dispatch<LoginActionsType>;
}

const LoginContext = createContext<ILoginContext>({ ...INITIAL_STATE, dispatch: () => null });

export default LoginContext;

export const useLoginDispatch = () => {
  const dispatch = useContextSelector(LoginContext, state => state.dispatch);

  return dispatch;
};
