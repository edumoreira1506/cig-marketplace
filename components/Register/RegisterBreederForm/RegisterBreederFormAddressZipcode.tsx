import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { FormField } from '@cig-platform/ui';
import { useDebouncedEffect } from '@cig-platform/hooks';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederAddressZipcode } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederAddressField } from '@Contexts/RegisterContext/registerActions';
import CepService from '@Services/CepService';

const Input: any = dynamic(() => import('@cig-platform/ui').then(mod => mod.Input) as any, { ssr: false });

export default function RegisterBreederFormAddressZipcode() {
  const [isLoading, setIsLoading] = useState(false);

  const zipcode = useRegisterSelector(selectBreederAddressZipcode);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeAdressZipcode = useCallback((newZipcode: string | number) => {
    dispatch(setBreederAddressField('zipcode', String(newZipcode)));
  }, []);

  useDebouncedEffect(() => {
    (async () => {
      if (!zipcode) return;

      setIsLoading(true);

      const addressInfo = await CepService.getInfo(zipcode);

      setIsLoading(false);

      if (!addressInfo) return;

      dispatch(setBreederAddressField('city', addressInfo.localidade));
      dispatch(setBreederAddressField('province', addressInfo.uf));
      dispatch(setBreederAddressField('street', addressInfo.logradouro));
    })();
  }, 1000, [zipcode]);

  return (
    <FormField>
      <Input
        label={t('breeder.fields.address.zipcode')}
        type="number"
        value={zipcode}
        onChange={handleChangeAdressZipcode}
        placeholder="00000-000"
        isLoading={isLoading}
        name="breeder-address-zipcode"
        mask="#####-###"
      />
    </FormField>
  );
}
