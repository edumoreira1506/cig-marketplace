import { RegisterState } from './registerReducer';

export const selectUser = (state: RegisterState) => state.user;

export const selectPoultry = (state: RegisterState) => state.poultry;

export const selectUserName = (state: RegisterState) => selectUser(state).name;

export const selectUserEmail = (state: RegisterState) => selectUser(state).email;

export const selectUserPassword = (state: RegisterState) => selectUser(state).password;

export const selecttUserConfirmPassword = (state: RegisterState) => selectUser(state).confirmPassword;

export const selectUserRegister = (state: RegisterState) => selectUser(state).register;

export const selectUserBirthDate = (state: RegisterState) => selectUser(state).birthDate;

export const selectPoultryName = (state: RegisterState) => selectPoultry(state).name;

export const selectPoultryDescription = (state: RegisterState) => selectPoultry(state).description;

export const selectPoultryAddress = (state: RegisterState) => selectPoultry(state).address;

export const selectPoultryAddressCity = (state: RegisterState) => selectPoultryAddress(state).city;

export const selectPoultryAddressProvince = (state: RegisterState) => selectPoultryAddress(state).province;

export const selectPoultryAddressStreet = (state: RegisterState) => selectPoultryAddress(state).street;

export const selectPoultryAddressNumber = (state: RegisterState) => selectPoultryAddress(state).number;

export const selectPoultryAddressZipcode = (state: RegisterState) => selectPoultryAddress(state).zipcode;

export const selectIsLoading = (state: RegisterState) => state.isLoading;

export const selectError = (state: RegisterState) => state.error;
