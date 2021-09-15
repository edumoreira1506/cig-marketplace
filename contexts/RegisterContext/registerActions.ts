import { RegisterState } from './registerReducer';

export const setUserField = (key: keyof RegisterState['user'], value: string) => ({
  type: 'SET_USER_FIELD',
  payload: { key, value },
} as const);
