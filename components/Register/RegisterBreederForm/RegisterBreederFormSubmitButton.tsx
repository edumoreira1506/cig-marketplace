import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormField } from '@cig-platform/ui';

import { useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { selectIsLoading, selectBreeder, selectUser, selectRegisterType, selectWhatsApp } from '@Contexts/RegisterContext/registerSelectors';
import { RegisterBreederFormProps } from './RegisterBreederForm';

export interface RegisterBreederFormSubmitButtonProps {
  onSubmit: RegisterBreederFormProps['onSubmit'];
}

export default function RegisterBreederFormSubmitButton({ onSubmit }: RegisterBreederFormSubmitButtonProps) {
  const breeder = useRegisterSelector(selectBreeder);
  const user = useRegisterSelector(selectUser);
  const isLoading = useRegisterSelector(selectIsLoading);
  const registerType = useRegisterSelector(selectRegisterType);
  const whatsApp = useRegisterSelector(selectWhatsApp);

  const { t } = useTranslation();
  
  const isValidBreeder = useMemo(() => Boolean(breeder.name), [breeder.name]);

  const handleSubmitBreederForm = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidBreeder) return;

    onSubmit({ user, breeder, registerType, whatsApp });
  }, [isValidBreeder, user, breeder, registerType, whatsApp]);

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
