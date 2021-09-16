import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import AuthBffService from '@Services/AuthBffService';

export default function useSubmitRegister({
  onError,
  onSuccess
}: {
  onError: (message: string) => void;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const handleSubmitRegister = useCallback(async ({ poultry, user }: { poultry: RegisterState['poultry']; user: RegisterState['user'] }) => {
    const authBffResponse = await AuthBffService.registerUser({ user, poultry });

    if (!authBffResponse?.ok) {
      onError(authBffResponse?.error?.message ?? t('common.something-wrong'));
    } else {
      onSuccess();
    }
  }, [onError, onSuccess]);

  return handleSubmitRegister;  
}
