import { Dispatch } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { ApiErrorType } from '@cig-platform/types';

import { ActionType } from '@Types/context';

export const DEFAULT_STATE = {
  isLoading: false,
  error: null,
};

export interface DefaultState {
  isLoading?: boolean;
  error?: null | ApiErrorType;
}

export const createReducableContext = <T>({
  initialState,
  actions
}: {
  initialState: T,
  actions: any,
}) => {
  type ActionsType = ActionType<typeof actions>

  type IContext = DefaultState & T & {
    dispatch: Dispatch<ActionsType>;
  }

  const context = createContext<IContext>({ ...DEFAULT_STATE, ...initialState, dispatch: () => null });

  const useDispatch = () => {
    const dispatch = useContextSelector(context, state => state.dispatch);
  
    return dispatch;
  };

  return { context, useDispatch };
};
