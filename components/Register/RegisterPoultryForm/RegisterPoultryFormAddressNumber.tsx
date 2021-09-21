import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultryAddressNumber } from '@Contexts/RegisterContext/registerSelectors';
import { setPoultryAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterPoultryFormAddressNumber() {
  const number = useContextSelector(RegisterContext, selectPoultryAddressNumber);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressNumber = useCallback((number: string | number) => {
    dispatch(setPoultryAddressField('number', Number(number)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('poultry.fields.address.number')}
        type="number"
        value={number ?? ''}
        onChange={handleChangeAdressNumber}
        placeholder="12345"
      />
    </FormField>
  );
}
