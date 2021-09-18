import { Dispatch } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { ActionType } from '@Types/context';

import * as actions from './loginActions';
import { INITIAL_STATE, LoginState } from './loginReducer';

export interface ILoginContext extends LoginState {
  dispatch: Dispatch<ActionType<typeof actions>>;
}

const LoginContext = createContext<ILoginContext>({ ...INITIAL_STATE, dispatch: () => null });

export default LoginContext;

export const useLoginDispatch = () => {
  const dispatch = useContextSelector(LoginContext, state => state.dispatch);

  return dispatch;
};
