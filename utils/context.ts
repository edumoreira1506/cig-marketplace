import { Dispatch } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { ApiErrorType } from '@cig-platform/types';

export const DEFAULT_STATE = {
  isLoading: false,
  error: null,
};

export interface DefaultState {
  isLoading?: boolean;
  error?: null | ApiErrorType;
}

export const createReducableContext = <T, I>(initialState: T) => {
  type IContext = DefaultState & T & {
    dispatch: Dispatch<I>;
  }

  const context = createContext<IContext>({ ...DEFAULT_STATE, ...initialState, dispatch: () => null });

  const useDispatch = () => {
    const dispatch = useContextSelector(context, state => state.dispatch);
  
    return dispatch;
  };

  return { context, useDispatch };
};
