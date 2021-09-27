import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederAddressNumber } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormAddressNumber() {
  const number = useRegisterSelector(selectBreederAddressNumber);

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
