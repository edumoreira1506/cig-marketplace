import AuthBffClient from '@cig-platform/auth-bff-client';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import { AUTH_BFF_URL } from '@Constants/urls';
import { removeNullProperties } from '@Utils/object';
import { LoginState } from '@Contexts/LoginContext/loginReducer';
import { UserRegisterTypeEnum } from '@cig-platform/enums';

const authBffClient = new AuthBffClient(AUTH_BFF_URL);

export default class AuthBffService {
  static registerUser({
    user,
    breeder,
    type = UserRegisterTypeEnum.Default,
  }: {
    user: Partial<RegisterState['user']>;
    breeder: Partial<RegisterState['breeder']>;
    type?: string;
  }) {
    return authBffClient.registerUser(
      removeNullProperties(user) as any,
      removeNullProperties(breeder) as any,
      type,
      user?.externalId
    );
  }

  static login({
    email,
    password,
    type = UserRegisterTypeEnum.Default,
    externalId
  }: {
    email: LoginState['email'];
    password: LoginState['password'];
    type?: string;
    externalId?: string;
  }) {
    return authBffClient.authUser(email, password, type, externalId);
  }

  static recoverPassword(email: string) {
    return authBffClient.recoverPassword(email);
  }

  static refreshToken(token: string) {
    return authBffClient.refreshToken(token);
  }
}
