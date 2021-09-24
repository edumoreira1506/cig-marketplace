import { ApiErrorType } from '@cig-platform/types';

import { RegisterState } from './registerReducer';

export const setError = (error: ApiErrorType | any) => ({
  type: 'SET_ERROR',
  payload: { error }
} as const );

export const setIsLoading = (isLoading: boolean) => ({
  type: 'SET_IS_LOADING',
  payload: { isLoading }
} as const );

export const setUserField = (key: keyof RegisterState['user'], value: string) => ({
  type: 'SET_USER_FIELD',
  payload: { key, value },
} as const);

export const setBreederField = (key: keyof RegisterState['breeder'], value: string) => ({
  type: 'SET_BREEDER_FIELD',
  payload: { key, value }
} as const);

export const setBreederAddressField = (key: keyof RegisterState['breeder']['address'], value: string | number) => ({
  type: 'SET_BREEDER_ADDRESS_FIELD',
  payload: { key, value }
} as const );
