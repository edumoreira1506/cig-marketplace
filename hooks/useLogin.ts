import { useCallback } from 'react';

import AuthBffService from '@Services/AuthBffService';
import { setError, setIsLoading } from '@Contexts/LoginContext/loginActions';
import { useLoginDispatch } from '@Contexts/LoginContext/LoginContext';
import { LoginState } from '@Contexts/LoginContext/loginReducer';

export default function useLogin({
  onSuccess
}: {
  onSuccess: (token: string) => void;
}) {
  const dispatch = useLoginDispatch();

  const handleLogin = useCallback(async (email: LoginState['email'], password: LoginState['password']) => {
    dispatch(setIsLoading(true));

    const authBffResponse = await AuthBffService.login({ email, password });

    dispatch(setIsLoading(false));

    if (!authBffResponse?.ok) {
      dispatch(setError(authBffResponse?.error));
    } else {
      onSuccess(authBffResponse.token);
    }
  }, [onSuccess]);

  return handleLogin;  
}
