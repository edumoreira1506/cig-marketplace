import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederName } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormName() {
  const name = useContextSelector(RegisterContext, selectBreederName);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeName = useCallback((newName: string | number) => {
    dispatch(setBreederField('name', String(newName)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('breeder.fields.name')}
        type="text"
        value={name}
        onChange={handleChangeName}
        required
        requiredMessage={t('common.required-field', { field: t('breeder.fields.name') })}
        placeholder="Criatório Silva"
      />
    </FormField>
  );
}
