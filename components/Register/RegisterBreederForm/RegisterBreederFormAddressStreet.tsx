import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederAddressStreet } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormAddressStreet() {
  const street = useRegisterSelector(selectBreederAddressStreet);

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
        name="breeder-address-street"
        placeholder="Rua João de Camargo"
      />
    </FormField>
  );
}
