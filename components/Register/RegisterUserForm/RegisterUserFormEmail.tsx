import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserEmail } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormEmail() {
  const email = useRegisterSelector(selectUserEmail);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeEmail = useCallback((newEmail: string | number) => {
    dispatch(setUserField('email', String(newEmail)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('user.fields.email')}
        type="email"
        value={email}
        onChange={handleChangeEmail}
        required
        requiredMessage={t('common.required-field', { field: t('user.fields.email') })}
        placeholder="exemplo@email.com"
        autoComplete="username"
        name='user-email'
      />
    </FormField>
  );
}
