import { useCallback } from 'react';

import AuthBffService from '@Services/AuthBffService';
import { setError, setIsLoading } from '@Contexts/LoginContext/loginActions';
import { useLoginDispatch } from '@Contexts/LoginContext/LoginContext';
import { LoginState } from '@Contexts/LoginContext/loginReducer';

export default function useLogin({
  onSuccess
}: {
  onSuccess: () => void;
}) {
  const dispatch = useLoginDispatch();

  const handleLogin = useCallback(async (email: LoginState['email'], password: LoginState['password']) => {
    dispatch(setIsLoading(true));

    const authBffResponse = await AuthBffService.login({ email, password });

    dispatch(setIsLoading(false));

    if (!authBffResponse?.ok) {
      dispatch(setError(authBffResponse?.error));
    } else {
      onSuccess();
    }
  }, [onSuccess]);

  return handleLogin;  
}
