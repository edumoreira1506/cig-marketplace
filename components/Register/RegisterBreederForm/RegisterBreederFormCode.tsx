import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederCode } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormCode() {
  const code = useRegisterSelector(selectBreederCode);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeCode = useCallback((newCode: string | number) => {
    dispatch(setBreederField('code', String(newCode).toUpperCase()));
  }, []);

  return (
    <FormField>
      <Input
        label={t('breeder.fields.code')}
        type="text"
        value={code}
        onChange={handleChangeCode}
        required
        requiredMessage={t('common.required-field', { field: t('breeder.fields.code') })}
        placeholder="ABCD"
        min={4}
        name="breeder-code"
        max={4}
      />
    </FormField>
  );
}
