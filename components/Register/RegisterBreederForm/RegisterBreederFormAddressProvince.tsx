import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Select } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederAddressProvince } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederAddressField } from '@Contexts/RegisterContext/registerActions';
import { AVAILABLE_PROVINCES } from '@Constants/breeder';

const selectOptions = AVAILABLE_PROVINCES.map(province => ({
  label: province,
  value: province
}));

export default function RegisterBreederFormAddressProvince() {
  const province = useRegisterSelector(selectBreederAddressProvince);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressProvince = useCallback((newProvince: string | number) => {
    dispatch(setBreederAddressField('province', String(newProvince)));
  }, []);

  return (
    <FormField>
      <Select
        options={selectOptions}
        label={t('breeder.fields.address.province')}
        value={province}
        onChange={handleChangeAdressProvince}
        showEmptyOption
        inputTestId="register-form-breeder-address-province"
        emptyOptionText={t('common.select-the-province')}
        name="breeder-address-province"
      />
    </FormField>
  );
}
