import AuthBffClient from '@cig-platform/auth-bff-client';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import { AUTH_BFF_URL } from '@Constants/urls';

const authBffClient = new AuthBffClient(AUTH_BFF_URL);

export default class AuthBffService {
  static registerUser({ user, poultry }: { user: RegisterState['user']; poultry: RegisterState['poultry'] }) {
    return authBffClient.registerUser(user as any, poultry as any);
  }
}
