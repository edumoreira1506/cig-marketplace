import { useCallback } from 'react';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import AuthBffService from '@Services/AuthBffService';
import { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { setError, setIsLoading } from '@Contexts/RegisterContext/registerActions';

export default function useSubmitRegister({
  onSuccess
}: {
  onSuccess: () => void;
}) {
  const dispatch = useRegisterDispach();

  const handleSubmitRegister = useCallback(async ({ breeder, user }: { breeder: RegisterState['breeder']; user: RegisterState['user'] }) => {
    dispatch(setIsLoading(true));

    const authBffResponse = await AuthBffService.registerUser({ user, breeder });

    dispatch(setIsLoading(false));

    if (!authBffResponse?.ok) {
      dispatch(setError(authBffResponse?.error));
    } else {
      onSuccess();
    }
  }, [onSuccess]);

  return handleSubmitRegister;  
}
