import { useCallback } from 'react';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import AuthBffService from '@Services/AuthBffService';
import { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { setIsLoading } from '@Contexts/RegisterContext/registerActions';
import { setIsLoading as setIsLoadingApp } from '@Contexts/AppContext/appActions';
import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError } from '@Contexts/AppContext/appActions';

export default function useSubmitRegister({
  onSuccess
}: {
  onSuccess: () => void;
}) {
  const appDispatch = useAppDispatch();

  const dispatch = useRegisterDispach();

  const handleSubmitRegister = useCallback(async ({ breeder, user, registerType, whatsApp }: {
    breeder: RegisterState['breeder'];
    user: RegisterState['user'];
    registerType: string;
    whatsApp: string;
  }) => {
    dispatch(setIsLoading(true));
    appDispatch(setIsLoadingApp(true));

    const authBffResponse = await AuthBffService.registerUser({
      user,
      breeder,
      type: registerType,
      whatsApp
    });

    dispatch(setIsLoading(false));
    appDispatch(setIsLoadingApp(false));

    if (!authBffResponse?.ok) {
      appDispatch(setError((authBffResponse as any)?.error));
    } else {
      onSuccess();
    }
  }, [onSuccess, appDispatch, dispatch]);

  return handleSubmitRegister;  
}
