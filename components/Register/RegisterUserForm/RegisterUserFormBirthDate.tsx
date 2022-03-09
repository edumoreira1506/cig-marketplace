import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Input } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserBirthDate } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormBirthDate() {
  const birthDate = useRegisterSelector(selectUserBirthDate);

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
        name='user-birth-data'
      />
    </FormField>
  );
}
