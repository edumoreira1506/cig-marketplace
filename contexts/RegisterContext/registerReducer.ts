
import { ApiErrorType } from '@cig-platform/types';

import { ActionType } from '@Types/context';

import * as actions from './registerActions';

export interface RegisterState {
  isLoading: boolean;
  error: null | ApiErrorType;
  user: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    register: string;
    birthDate: string;
  },
  breeder: {
    name: string;
    description: string;
    address: {
      city: string;
      zipcode: string;
      province: string;
      street: string;
      number: number | undefined;
    }
  }
}

export const INITIAL_STATE: RegisterState = {
  isLoading: false,
  error: null,
  user: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    register: '',
    birthDate: '',
  },
  breeder: {
    name: '',
    description: '',
    address: {
      city: '',
      province: '',
      street: '',
      zipcode: '',
      number: undefined
    }
  }
};

export type RegisterActionsType = ActionType<typeof actions>

export default function registerReducer(
  state = INITIAL_STATE,
  action: RegisterActionsType
): RegisterState {
  switch (action.type) {
  case 'SET_ERROR':
    return { ...state, error: action.payload.error };
  case 'SET_IS_LOADING':
    return { ...state, isLoading: action.payload.isLoading };
  case 'SET_USER_FIELD':
    return { ...state, user: { ...state.user, [action.payload.key]: action.payload.value } };
  case 'SET_BREEDER_FIELD':
    return { ...state, breeder: { ...state.breeder,  [action.payload.key]: action.payload.value } };
  case 'SET_BREEDER_ADDRESS_FIELD':
    return {
      ...state,
      breeder: {
        ...state.breeder,
        address: {
          ...state.breeder.address,
          [action.payload.key]: action.payload.value
        }
      }
    };
  default:
    return state;
  }
}
