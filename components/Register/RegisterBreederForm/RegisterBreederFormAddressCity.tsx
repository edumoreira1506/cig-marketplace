import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederAddressCity } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormAddressCity() {
  const city = useRegisterSelector(selectBreederAddressCity);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressCity = useCallback((newCity: string | number) => {
    dispatch(setBreederAddressField('city', String(newCity)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('breeder.fields.address.city')}
        type="text"
        value={city}
        onChange={handleChangeAdressCity}
        placeholder="São Paulo"
      />
    </FormField>
  );
}
