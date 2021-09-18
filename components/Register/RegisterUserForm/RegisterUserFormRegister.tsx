import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { FormField } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserRegister } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

const Input: any = dynamic(() => import('@cig-platform/ui').then(mod => mod.Input) as any, { ssr: false });

export default function RegisterUserFormRegister() {
  const register = useContextSelector(RegisterContext, selectUserRegister);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeRegister = useCallback((newRegister: string | number) => {
    dispatch(setUserField('register', String(newRegister)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('user.fields.register')}
        type="number"
        value={register}
        onChange={handleChangeRegister}
        placeholder="977.566.300-84"
        mask="###.###.###-##"
      />
    </FormField>
  );
}
