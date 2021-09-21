
import { ApiErrorType } from '@cig-platform/types';

import { ActionType } from '@Types/context';

import * as actions from './loginActions';

export interface LoginState {
  isLoading: boolean;
  error: null | ApiErrorType;
  email: string;
  password: string;
}

export const INITIAL_STATE: LoginState = {
  isLoading: false,
  error: null,
  email: '',
  password: '',
};

export default function loginReducer(
  state = INITIAL_STATE,
  action: ActionType<typeof actions>
): LoginState {
  switch (action.type) {
  case 'SET_ERROR':
    return { ...state, error: action.payload.error };
  case 'SET_IS_LOADING':
    return { ...state, isLoading: action.payload.isLoading };
  case 'SET_EMAIL':
    return { ...state, email: action.payload.email };
  case 'SET_PASSWORD':
    return { ...state, password: action.payload.password };
  default:
    return state;
  }
}
