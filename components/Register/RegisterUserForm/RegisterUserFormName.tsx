import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserName } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormName() {
  const name = useContextSelector(RegisterContext, selectUserName);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeName = useCallback((newName: string | number) => {
    dispatch(setUserField('name', String(newName)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('user.fields.name')}
        type="text"
        value={name}
        onChange={handleChangeName}
        required
        requiredMessage={t('common.required-field', { field: t('user.fields.name') })}
        placeholder="João de Sá"
      />
    </FormField>
  );
}
