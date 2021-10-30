import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederName } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormName() {
  const name = useRegisterSelector(selectBreederName);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeName = useCallback((newName: string | number) => {
    const stringNewName = String(newName);

    dispatch(setBreederField('name', stringNewName));

    const code = stringNewName.split(' ').map((word) => word?.[0] ?? '').join('').toUpperCase();

    dispatch(setBreederField('code', code.toUpperCase()));
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
