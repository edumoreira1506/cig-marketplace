import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultryAddressStreet } from '@Contexts/RegisterContext/registerSelectors';
import { setPoultryAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterPoultryFormAddressStreet() {
  const street = useContextSelector(RegisterContext, selectPoultryAddressStreet);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressStreet = useCallback((newStreet: string | number) => {
    dispatch(setPoultryAddressField('street', String(newStreet)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('poultry.fields.address.street')}
        type="text"
        value={street}
        onChange={handleChangeAdressStreet}
        placeholder="Rua João de Camargo"
      />
    </FormField>
  );
}
