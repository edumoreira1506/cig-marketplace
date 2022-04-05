import { RegisterState } from './registerReducer';

export const setIsLoading = (isLoading: boolean) => ({
  type: 'SET_IS_LOADING',
  payload: { isLoading }
} as const );

export const setWhatsApp = (whatsApp: string) => ({
  type: 'SET_WHATS_APP',
  payload: { whatsApp }
} as const);

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

export const setRegisterType = (type: RegisterState['type']) => ({
  type: 'SET_REGISTER_TYPE',
  payload: { type }
} as const);

export const setUserExternalId = (externalId: string) => ({
  type: 'SET_USER_EXTERNAL_ID',
  payload: { externalId }
} as const);
