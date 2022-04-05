import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { FormField } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectWhatsApp } from '@Contexts/RegisterContext/registerSelectors';
import { setWhatsApp } from '@Contexts/RegisterContext/registerActions';

const Input: any = dynamic(() => import('@cig-platform/ui').then(mod => mod.Input) as any, { ssr: false });

export default function RegisterBreederFormWhatsApp() {
  const whatsApp = useRegisterSelector(selectWhatsApp);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeWhatsApp = useCallback((newWhatsApp: string | number) => {
    dispatch(setWhatsApp(String(newWhatsApp)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('breeder.fields.whats-app')}
        type="number"
        value={whatsApp}
        onChange={handleChangeWhatsApp}
        placeholder="(12) 93456-7890"
        name="breeder-whats-app"
        mask="(##) #####-####"
        required
      />
    </FormField>
  );
}
