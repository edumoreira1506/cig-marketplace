import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import AuthBffService from '@Services/AuthBffService';
import { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { setIsLoading } from '@Contexts/RegisterContext/registerActions';

export default function useSubmitRegister({
  onError,
  onSuccess
}: {
  onError: (message: string) => void;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const dispatch = useRegisterDispach();

  const handleSubmitRegister = useCallback(async ({ poultry, user }: { poultry: RegisterState['poultry']; user: RegisterState['user'] }) => {
    dispatch(setIsLoading(true));

    const authBffResponse = await AuthBffService.registerUser({ user, poultry });

    dispatch(setIsLoading(false));

    if (!authBffResponse?.ok) {
      onError(authBffResponse?.error?.message ?? t('common.something-wrong'));
    } else {
      onSuccess();
    }
  }, [onError, onSuccess]);

  return handleSubmitRegister;  
}
