import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { FormField, Input } from '@cig-platform/ui';

import RegisterContext, { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultryName } from '@Contexts/RegisterContext/registerSelectors';
import { setPoultryField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterPoultryFormName() {
  const name = useContextSelector(RegisterContext, selectPoultryName);

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const handleChangeName = useCallback((newName: string | number) => {
    dispatch(setPoultryField('name', String(newName)));
  }, []);

  return (
    <FormField>
      <Input
        label={t('poultry.fields.name')}
        type="text"
        value={name}
        onChange={handleChangeName}
        required
        placeholder="Criatório Silva"
      />
    </FormField>
  );
}
