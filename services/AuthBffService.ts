import AuthBffClient from '@cig-platform/auth-bff-client';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import { AUTH_BFF_URL } from '@Constants/urls';
import { removeNullProperties } from '@Utils/object';
import { LoginState } from '@Contexts/LoginContext/loginReducer';
import { UserRegisterTypeEnum } from '@cig-platform/enums';

const authBffClient = new AuthBffClient(AUTH_BFF_URL);

export default class AuthBffService {
  static async registerUser({
    user,
    breeder,
    type = UserRegisterTypeEnum.Default,
  }: {
    user: Partial<RegisterState['user']>;
    breeder: Partial<RegisterState['breeder']>;
    type?: string;
  }) {
    try {
      const data = await authBffClient.registerUser(
        removeNullProperties(user) as any,
        removeNullProperties(breeder) as any,
        type,
        user?.externalId
      );

      return data;
    } catch (error) {
      return {
        ok: false,
        error
      };
    }
  }

  static async login({
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
    try {
      const data = await authBffClient.authUser(email, password, type, externalId);

      return data;
    } catch (error) {
      return {
        ok: false,
        error
      };
    }
  }

  static async recoverPassword(email: string) {
    try {
      const data = await authBffClient.recoverPassword(email);

      return data;
    } catch (error) {
      return {
        ok: false,
        error
      };
    }
  }

  static async refreshToken(token: string) {
    try {
      const data = await authBffClient.refreshToken(token);

      return data;
    } catch (error) {
      return {
        ok: false,
        error
      };
    }
  }
}
