import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserPassword } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormPassword() {
  const password = useContextSelector(RegisterContext, selectUserPassword);

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
      />
    </FormField>
  );
}
