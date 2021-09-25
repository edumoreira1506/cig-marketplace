import AuthBffClient from '@cig-platform/auth-bff-client';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import { AUTH_BFF_URL } from '@Constants/urls';
import { removeNullProperties } from '@Utils/object';
import { LoginState } from '@Contexts/LoginContext/loginReducer';

const authBffClient = new AuthBffClient(AUTH_BFF_URL);

export default class AuthBffService {
  static registerUser({ user, breeder }: { user: Partial<RegisterState['user']>; breeder: Partial<RegisterState['breeder']> }) {
    return authBffClient.registerUser(removeNullProperties(user) as any, removeNullProperties(breeder) as any);
  }

  static login({ email, password }: { email: LoginState['email']; password: LoginState['password'] }) {
    return authBffClient.authUser(email, password);
  }
}
