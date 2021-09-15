import { useCallback, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';

import RegisterContext from '@Contexts/RegisterContext/RegisterContext';
import { selectUser } from '@Contexts/RegisterContext/registerSelectors';

import RegisterUserFormName from './RegisterUserFormName';
import RegisterUserFormEmail from './RegisterUserFormEmail';
import RegisterUserFormPassword from './RegisterUserFormPassword';
import RegisterUserFormConfirmPassword from './RegisterUserFormConfirmPassword';
import RegisterUserFormRegister from './RegisterUserFormRegister';
import RegisterUserFormBirthDate from './RegisterUserFormBirthDate';
import { StyledForm } from './RegisterUserForm.styles';
import RegisterUserFormSubmitButton from './RegisterUserFormSubmitButton';

export interface RegisterUserFormProps {
  onSubmit: () => void;
  title: string;
}

export default function RegisterUserForm({ onSubmit, title }: RegisterUserFormProps) {
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
    <StyledForm onSubmit={handleSubmitUserForm} title={title}>
      <RegisterUserFormName />
      <RegisterUserFormEmail />
      <RegisterUserFormPassword />
      <RegisterUserFormConfirmPassword />
      <RegisterUserFormRegister />
      <RegisterUserFormBirthDate />
      <RegisterUserFormSubmitButton disabled={!isValidUser} onSubmit={handleSubmitUserForm} />
    </StyledForm>
  );
}
