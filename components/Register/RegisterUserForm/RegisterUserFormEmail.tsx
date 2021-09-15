import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserEmail } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormEmail() {
  const email = useContextSelector(RegisterContext, selectUserEmail);

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
        placeholder="exemplo@email.com"
        autoComplete="username"
      />
    </FormField>
  );
}
