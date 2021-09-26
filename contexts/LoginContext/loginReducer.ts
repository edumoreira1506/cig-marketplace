import { ActionType } from '@Types/context';
import { DefaultState } from '@Utils/context';

import * as actions from './loginActions';

export interface LoginState extends DefaultState {
  email: string;
  password: string;
}

export const INITIAL_STATE = {
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
