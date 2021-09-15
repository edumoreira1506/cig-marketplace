import { RegisterState } from './registerReducer';

export const setUserField = (key: keyof RegisterState['user'], value: string) => ({
  type: 'SET_USER_FIELD',
  payload: { key, value },
} as const);

export const setPoultryField = (key: keyof RegisterState['poultry'], value: string) => ({
  type: 'SET_POULTRY_FIELD',
  payload: { key, value }
} as const);

export const setPoultryAddressField = (key: keyof RegisterState['poultry']['address'], value: string) => ({
  type: 'SET_POULTRY_ADDRESS_FIELD',
  payload: { key, value }
} as const );
