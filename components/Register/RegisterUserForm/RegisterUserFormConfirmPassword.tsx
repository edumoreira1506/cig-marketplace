import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selecttUserConfirmPassword } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormConfirmPassword() {
  const confirmPassword = useRegisterSelector(selecttUserConfirmPassword);

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
        requiredMessage={t('common.required-field', { field: t('user.fields.confirm-password') })}
        placeholder="********"
        name='user-confirm-password'
        autoComplete="new-password"
      />
    </FormField>
  );
}
