import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, DatePicker } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectUserBirthDate } from '@Contexts/RegisterContext/registerSelectors';
import { setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterUserFormBirthDate() {
  const birthDate = useRegisterSelector(selectUserBirthDate);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeBirthDate = useCallback((newBirthDate: Date) => {
    dispatch(setUserField('birthDate', newBirthDate?.toISOString?.()?.split?.('T')?.[0]));
  }, []);

  return (
    <FormField>
      <DatePicker
        label={t('user.fields.birth-date')}
        value={birthDate ? new Date(birthDate) : undefined as any}
        onChange={handleChangeBirthDate as any}
        name='user-birth-data'
      />
    </FormField>
  );
}
