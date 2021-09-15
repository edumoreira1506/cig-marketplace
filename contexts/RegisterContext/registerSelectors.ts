import { RegisterState } from './registerReducer';

export const selectUser = (state: RegisterState) => state.user;

export const selectPoultry = (state: RegisterState) => state.poultry;

export const selectUserName = (state: RegisterState) => selectUser(state).name;

export const selectUserEmail = (state: RegisterState) => selectUser(state).email;

export const selectUserPassword = (state: RegisterState) => selectUser(state).password;

export const selecttUserConfirmPassword = (state: RegisterState) => selectUser(state).confirmPassword;

export const selectUserRegister = (state: RegisterState) => selectUser(state).register;

export const selectUserBirthDate = (state: RegisterState) => selectUser(state).birthDate;
