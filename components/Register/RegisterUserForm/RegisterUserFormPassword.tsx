import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserPassword } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormPassword() {
  const password = useRegisterSelector(selectUserPassword);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangePassword = useCallback((newPassword: string | number) => {
    dispatch(setUserField('password', String(newPassword)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('user.fields.password')}
        type="password"
        value={password}
        onChange={handleChangePassword}
        required
        placeholder="********"
        requiredMessage={t('common.required-field', { field: t('user.fields.password') })}
        autoComplete="new-password"
      />
    </FormField>
  );
}
