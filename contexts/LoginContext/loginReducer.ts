import { DefaultState, ActionType } from '@cig-platform/context';

import * as actions from './loginActions';

export interface LoginState extends DefaultState {
  email: string;
  password: string;
}

export const INITIAL_STATE = {
  email: '',
  password: '',
};

export type LoginActionTypes = ActionType<typeof actions>

export default function loginReducer(
  state = INITIAL_STATE,
  action: LoginActionTypes
): LoginState {
  switch (action.type) {
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
