import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultryAddressZipcode } from '@Contexts/RegisterContext/registerSelectors';
import { setPoultryAddressField } from '@Contexts/RegisterContext/registerActions';
import useDebouncedEffect from '@Hooks/useDebouncedEffect';
import CepService from '@Services/CepService';

export default function RegisterPoultryFormAddressZipcode() {
  const zipcode = useContextSelector(RegisterContext, selectPoultryAddressZipcode);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressZipcode = useCallback((newZipcode: string | number) => {
    dispatch(setPoultryAddressField('zipcode', String(newZipcode)));
  }, []);

  useDebouncedEffect(() => {
    (async () => {
      if (!zipcode) return;

      const addressInfo = await CepService.getInfo(zipcode);

      if (!addressInfo) return;

      dispatch(setPoultryAddressField('city', addressInfo.localidade));
      dispatch(setPoultryAddressField('province', addressInfo.uf));
      dispatch(setPoultryAddressField('street', addressInfo.logradouro));
    })();
  }, 1000, [zipcode]);

  return (
    <FormField>
      <Input
        label={t('poultry.fields.address.zipcode')}
        type="text"
        value={zipcode}
        onChange={handleChangeAdressZipcode}
        placeholder="00000-000"
      />
    </FormField>
  );
}
