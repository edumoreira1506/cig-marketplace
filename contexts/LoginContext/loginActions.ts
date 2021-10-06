export const setIsLoading = (isLoading: boolean) => ({
  type: 'SET_IS_LOADING',
  payload: { isLoading }
} as const );

export const setEmail = (email: string) => ({
  type: 'SET_EMAIL',
  payload: { email },
} as const);

export const setPassword = (password: string) => ({
  type: 'SET_PASSWORD',
  payload: { password },
} as const);
