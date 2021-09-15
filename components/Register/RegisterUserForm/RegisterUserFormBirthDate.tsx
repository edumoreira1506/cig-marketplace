import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserBirthDate } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormBirthDate() {
  const birthDate = useContextSelector(RegisterContext, selectUserBirthDate);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeBirthDate = useCallback((newBirthDate: string | number) => {
    dispatch(setUserField('birthDate', String(newBirthDate)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('user.fields.birth-date')}
        type="date"
        value={birthDate}
        onChange={handleChangeBirthDate}
      />
    </FormField>
  );
}