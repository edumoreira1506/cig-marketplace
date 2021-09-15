import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultryDescription } from '@Contexts/RegisterContext/registerSelectors';
import { setPoultryField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterPoultryFormDescription() {
  const description = useContextSelector(RegisterContext, selectPoultryDescription);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeDescription = useCallback((newDescription: string | number) => {
    dispatch(setPoultryField('description', String(newDescription)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('poultry.fields.description')}
        type="text"
        value={description}
        onChange={handleChangeDescription}
        placeholder="Aves de alto nível"
      />
    </FormField>
  );
}
