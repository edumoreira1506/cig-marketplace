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

export const setPoultryField = (key: keyof RegisterState['poultry'], value: string) => ({
  type: 'SET_POULTRY_FIELD',
  payload: { key, value }
} as const);

export const setPoultryAddressField = (key: keyof RegisterState['poultry']['address'], value: string | number) => ({
  type: 'SET_POULTRY_ADDRESS_FIELD',
  payload: { key, value }
} as const );
