import { Dispatch } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { ActionType } from '@Types/context';

import * as actions from './registerActions';
import { INITIAL_STATE, RegisterState } from './registerReducer';

export interface IRegisterContext extends RegisterState {
  dispatch: Dispatch<ActionType<typeof actions>>;
}

const RegisterContext = createContext<IRegisterContext>({ ...INITIAL_STATE, dispatch: () => null });

export default RegisterContext;

export const useRegisterDispach = () => {
  const dispatch = useContextSelector(RegisterContext, state => state.dispatch);

  return dispatch;
};
