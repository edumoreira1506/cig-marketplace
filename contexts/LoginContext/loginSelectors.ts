import { LoginState } from './loginReducer';

export const selectIsLoading = (state: LoginState) => state.isLoading;

export const selectEmail = (state: LoginState) => state.email;

export const selectPassword = (state: LoginState) => state.password;
