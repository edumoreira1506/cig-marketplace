import { useCallback } from 'react';

import AuthBffService from '@Services/AuthBffService';
import { setIsLoading } from '@Contexts/LoginContext/loginActions';
import { setError } from '@Contexts/AppContext/appActions';
import { useLoginDispatch } from '@Contexts/LoginContext/LoginContext';
import { LoginState } from '@Contexts/LoginContext/loginReducer';
import { useAppDispatch } from '@Contexts/AppContext/AppContext';

export default function useLogin({
  onSuccess
}: {
  onSuccess: (token: string) => void;
}) {
  const appDispatch = useAppDispatch();

  const dispatch = useLoginDispatch();

  const handleLogin = useCallback(async (email: LoginState['email'], password: LoginState['password']) => {
    dispatch(setIsLoading(true));
    appDispatch(setIsLoading(true));

    const authBffResponse = await AuthBffService.login({ email, password });

    dispatch(setIsLoading(false));
    appDispatch(setIsLoading(false));

    if (!authBffResponse?.ok) {
      appDispatch(setError(authBffResponse?.error));
    } else {
      onSuccess(authBffResponse.token);
    }
  }, [onSuccess, appDispatch, dispatch]);

  return handleLogin;  
}
