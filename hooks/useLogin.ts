import { useCallback } from 'react';
import { UserRegisterTypeEnum } from '@cig-platform/enums';

import AuthBffService from '@Services/AuthBffService';
import { setIsLoading } from '@Contexts/LoginContext/loginActions';
import { setError } from '@Contexts/AppContext/appActions';
import { useLoginDispatch } from '@Contexts/LoginContext/LoginContext';
import { LoginState } from '@Contexts/LoginContext/loginReducer';
import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setIsLoading as setIsLoadingApp } from '@Contexts/AppContext/appActions';
import { removeNullProperties } from '@Utils/object';

export default function useLogin({
  onSuccess
}: {
  onSuccess: (token: string) => void;
}) {
  const appDispatch = useAppDispatch();

  const dispatch = useLoginDispatch();

  const handleLogin = useCallback(async (
    email: LoginState['email'],
    password: LoginState['password'],
    type: string = UserRegisterTypeEnum.Default,
    externalId?: string
  ) => {
    dispatch(setIsLoading(true));
    appDispatch(setIsLoadingApp(true));

    const authBffResponse = await AuthBffService.login(removeNullProperties({
      email,
      password,
      type,
      externalId
    }) as any);

    dispatch(setIsLoading(false));
    appDispatch(setIsLoadingApp(false));

    if (!authBffResponse?.ok) {
      appDispatch(setError((authBffResponse as any)?.error));
    } else {
      onSuccess((authBffResponse as any).token);
    }
  }, [onSuccess, appDispatch, dispatch]);

  return handleLogin;  
}
