import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederAddressStreet } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormAddressStreet() {
  const street = useContextSelector(RegisterContext, selectBreederAddressStreet);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressStreet = useCallback((newStreet: string | number) => {
    dispatch(setBreederAddressField('street', String(newStreet)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('breeder.fields.address.street')}
        type="text"
        value={street}
        onChange={handleChangeAdressStreet}
        placeholder="Rua João de Camargo"
      />
    </FormField>
  );
}
