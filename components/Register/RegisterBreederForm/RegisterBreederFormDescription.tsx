import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, TextField } from '@cig-platform/ui';

import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectBreederDescription } from '@Contexts/RegisterContext/registerSelectors';
import { setBreederField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterBreederFormDescription() {
  const description = useRegisterSelector(selectBreederDescription);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeDescription = useCallback((newDescription: string | number) => {
    dispatch(setBreederField('description', String(newDescription)));
  }, []);

  return (
    <FormField>
      <TextField
        label={t('breeder.fields.description')}
        value={description}
        onChange={handleChangeDescription}
        name="breeder-description"
        placeholder="Aves de alto nível"
      />
    </FormField>
  );
}
