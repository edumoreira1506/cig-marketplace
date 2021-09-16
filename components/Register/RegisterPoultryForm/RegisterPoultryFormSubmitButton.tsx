import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormField } from '@cig-platform/ui';
import { useContextSelector } from 'use-context-selector';

import RegisterContext from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultry, selectUser } from '@Contexts/RegisterContext/registerSelectors';
import { RegisterPoultryFormProps } from './RegisterPoultryForm';

export interface RegisterPoultryFormSubmitButtonProps {
  onSubmit: RegisterPoultryFormProps['onSubmit'];
}

export default function RegisterPoultryFormSubmitButton({ onSubmit }: RegisterPoultryFormSubmitButtonProps) {
  const poultry = useContextSelector(RegisterContext, selectPoultry);
  const user = useContextSelector(RegisterContext, selectUser);

  const { t } = useTranslation();
  
  const isValidPoultry = useMemo(() => Boolean(poultry.name), [poultry.name]);

  const handleSubmitPoultryForm = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidPoultry) return;

    onSubmit({ user, poultry });
  }, [isValidPoultry, user, poultry]);

  return (
    <FormField>
      <Button disabled={!isValidPoultry} type="submit" onClick={handleSubmitPoultryForm} label={t('common.register')} />
    </FormField>
  );
}
