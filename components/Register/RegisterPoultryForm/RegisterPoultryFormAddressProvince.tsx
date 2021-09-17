import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Select } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultryAddressProvince } from '@Contexts/RegisterContext/registerSelectors';
import { setPoultryAddressField } from '@Contexts/RegisterContext/registerActions';
import { AVAILABLE_PROVINCES } from '@Constants/poultry';

const selectOptions = AVAILABLE_PROVINCES.map(province => ({
  label: province,
  value: province
}));

export default function RegisterPoultryFormAddressProvince() {
  const province = useContextSelector(RegisterContext, selectPoultryAddressProvince);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressProvince = useCallback((newProvince: string | number) => {
    dispatch(setPoultryAddressField('province', String(newProvince)));
  }, []);

  return (
    <FormField>
      <Select
        options={selectOptions}
        label={t('poultry.fields.address.province')}
        value={province}
        onChange={handleChangeAdressProvince}
        showEmptyOption
        inputTestId="register-form-poultry-address-province"
        emptyOptionText={t('common.select-the-province')}
      />
    </FormField>
  );
}
