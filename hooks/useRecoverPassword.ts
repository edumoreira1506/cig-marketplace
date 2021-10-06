import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { withInput } from '@Utils/alert';
import AuthBffService from '@Services/AuthBffService';

export default function useRecoverPassword({
  onSuccess
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const handleRecoverPassword = useCallback(() => {
    withInput(
      t('recover-password.message'),
      async (email) => {
        try {
          const response = await AuthBffService.recoverPassword(email);

          if (response?.ok) {
            onSuccess();
          }
        } catch(error) {
          console.log(error);
        }
      },
      t
    );
  }, [t, onSuccess]);

  return handleRecoverPassword;
}
