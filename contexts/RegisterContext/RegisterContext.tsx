import { Dispatch } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { INITIAL_STATE, RegisterState, RegisterActionsType } from './registerReducer';

export interface IRegisterContext extends RegisterState {
  dispatch: Dispatch<RegisterActionsType>;
}

const RegisterContext = createContext<IRegisterContext>({ ...INITIAL_STATE, dispatch: () => null });

export default RegisterContext;

export const useRegisterDispach = () => {
  const dispatch = useContextSelector(RegisterContext, state => state.dispatch);

  return dispatch;
};
