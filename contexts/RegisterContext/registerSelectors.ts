import { RegisterState } from './registerReducer';

export const selectUser = (state: RegisterState) => state.user;

export const selectBreeder = (state: RegisterState) => state.breeder;

export const selectUserName = (state: RegisterState) => selectUser(state).name;

export const selectUserEmail = (state: RegisterState) => selectUser(state).email;

export const selectUserPassword = (state: RegisterState) => selectUser(state).password;

export const selecttUserConfirmPassword = (state: RegisterState) => selectUser(state).confirmPassword;

export const selectUserRegister = (state: RegisterState) => selectUser(state).register;

export const selectUserBirthDate = (state: RegisterState) => selectUser(state).birthDate;

export const selectBreederName = (state: RegisterState) => selectBreeder(state).name;

export const selectBreederDescription = (state: RegisterState) => selectBreeder(state).description;

export const selectBreederAddress = (state: RegisterState) => selectBreeder(state).address;

export const selectBreederAddressCity = (state: RegisterState) => selectBreederAddress(state).city;

export const selectBreederAddressProvince = (state: RegisterState) => selectBreederAddress(state).province;

export const selectBreederAddressStreet = (state: RegisterState) => selectBreederAddress(state).street;

export const selectBreederAddressNumber = (state: RegisterState) => selectBreederAddress(state).number;

export const selectBreederAddressZipcode = (state: RegisterState) => selectBreederAddress(state).zipcode;

export const selectIsLoading = (state: RegisterState) => state.isLoading;

export const selectError = (state: RegisterState) => state.error;
