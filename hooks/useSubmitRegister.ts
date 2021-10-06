import { useCallback } from 'react';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import AuthBffService from '@Services/AuthBffService';
import { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { setIsLoading } from '@Contexts/RegisterContext/registerActions';
import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError } from '@Contexts/AppContext/appActions';

export default function useSubmitRegister({
  onSuccess
}: {
  onSuccess: () => void;
}) {
  const appDispatch = useAppDispatch();

  const dispatch = useRegisterDispach();

  const handleSubmitRegister = useCallback(async ({ breeder, user }: { breeder: RegisterState['breeder']; user: RegisterState['user'] }) => {
    dispatch(setIsLoading(true));
    appDispatch(setIsLoading(true));

    const authBffResponse = await AuthBffService.registerUser({ user, breeder });

    dispatch(setIsLoading(false));
    appDispatch(setIsLoading(false));

    if (!authBffResponse?.ok) {
      appDispatch(setError(authBffResponse?.error));
    } else {
      onSuccess();
    }
  }, [onSuccess, appDispatch, dispatch]);

  return handleSubmitRegister;  
}
