import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { Button, FormField } from '@cig-platform/ui';

import RegisterContext from '@Contexts/RegisterContext/RegisterContext';
import { selectIsLoading, selectBreeder, selectUser } from '@Contexts/RegisterContext/registerSelectors';
import { RegisterBreederFormProps } from './RegisterBreederForm';

export interface RegisterBreederFormSubmitButtonProps {
  onSubmit: RegisterBreederFormProps['onSubmit'];
}

export default function RegisterBreederFormSubmitButton({ onSubmit }: RegisterBreederFormSubmitButtonProps) {
  const breeder = useContextSelector(RegisterContext, selectBreeder);
  const user = useContextSelector(RegisterContext, selectUser);
  const isLoading = useContextSelector(RegisterContext, selectIsLoading);

  const { t } = useTranslation();
  
  const isValidBreeder = useMemo(() => Boolean(breeder.name), [breeder.name]);

  const handleSubmitBreederForm = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidBreeder) return;

    onSubmit({ user, breeder });
  }, [isValidBreeder, user, breeder]);

  return (
    <FormField>
      <Button
        isLoading={isLoading}
        disabled={!isValidBreeder}
        type="submit"
        onClick={handleSubmitBreederForm}
        label={t('common.register')}
      />
    </FormField>
  );
}
