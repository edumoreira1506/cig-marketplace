import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultryAddressCity } from '@Contexts/RegisterContext/registerSelectors';
import { setPoultryAddressField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterPoultryFormAddressCity() {
  const city = useContextSelector(RegisterContext, selectPoultryAddressCity);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressCity = useCallback((newCity: string | number) => {
    dispatch(setPoultryAddressField('city', String(newCity)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('poultry.fields.address.city')}
        type="text"
        value={city}
        onChange={handleChangeAdressCity}
        placeholder="São Paulo"
      />
    </FormField>
  );
}
