import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { withInput } from '@Utils/alert';
import AuthBffService from '@Services/AuthBffService';
import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError } from '@Contexts/AppContext/appActions';

export default function useRecoverPassword({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleRecoverPassword = useCallback(() => {
    return withInput(
      t('recover-password.message'),
      async (email) => {
        try {
          const response = await AuthBffService.recoverPassword(email);

          if (response?.ok) {
            onSuccess();
          } else {
            dispatch(setError(response?.error));
          }
        } catch(error) {
          console.log(error);
        }
      },
      t
    );
  }, [t, onSuccess, dispatch]);

  return handleRecoverPassword;
}
