import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selecttUserConfirmPassword } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormConfirmPassword() {
  const confirmPassword = useContextSelector(RegisterContext, selecttUserConfirmPassword);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeConfirmPassword = useCallback((newConfirmPassword: string | number) => {
    dispatch(setUserField('confirmPassword', String(newConfirmPassword)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('user.fields.confirm-password')}
        type="password"
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
        required
        placeholder="********"
      />
    </FormField>
  );
}
