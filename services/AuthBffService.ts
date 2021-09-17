import AuthBffClient from '@cig-platform/auth-bff-client';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import { AUTH_BFF_URL } from '@Constants/urls';
import { removeNullProperties } from '@Utils/object';

const authBffClient = new AuthBffClient(AUTH_BFF_URL);

export default class AuthBffService {
  static registerUser({ user, poultry }: { user: Partial<RegisterState['user']>; poultry: Partial<RegisterState['poultry']> }) {
    return authBffClient.registerUser(removeNullProperties(user) as any, removeNullProperties(poultry) as any);
  }
}
