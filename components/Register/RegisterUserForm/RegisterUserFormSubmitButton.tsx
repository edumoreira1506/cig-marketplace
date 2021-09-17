import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { Button, FormField } from '@cig-platform/ui';

import RegisterContext from '@Contexts/RegisterContext/RegisterContext';
import { selectUser } from '@Contexts/RegisterContext/registerSelectors';
import { RegisterUserFormProps } from './RegisterUserForm';

export interface RegisterUserFormSubmitButtonProps {
  onSubmit: RegisterUserFormProps['onSubmit'];
}

export default function RegisterUserFormSubmitButton({ onSubmit }: RegisterUserFormSubmitButtonProps) {
  const { t } = useTranslation();

  const user = useContextSelector(RegisterContext, selectUser);
  
  const isValidUser = useMemo(() => Boolean(user.name && user.password && user.confirmPassword && user.email), [
    user.name,
    user.password,
    user.confirmPassword,
    user.email
  ]);

  const handleSubmitUserForm = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidUser) return;

    onSubmit();
  }, [isValidUser]);

  return (
    <FormField>
      <Button disabled={!isValidUser} type="submit" onClick={handleSubmitUserForm} label={t('common.next')} />
    </FormField>
  );
}
