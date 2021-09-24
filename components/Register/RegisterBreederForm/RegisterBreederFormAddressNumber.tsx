import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederAddressNumber } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormAddressNumber() {
  const number = useContextSelector(RegisterContext, selectBreederAddressNumber);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressNumber = useCallback((number: string | number) => {
    dispatch(setBreederAddressField('number', Number(number)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('breeder.fields.address.number')}
        type="number"
        value={number ?? ''}
        onChange={handleChangeAdressNumber}
        placeholder="12345"
      />
    </FormField>
  );
}
