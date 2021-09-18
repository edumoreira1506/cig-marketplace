import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import LoginField from '@Components/Login/LoginField/LoginField';
import LoginContext, { useLoginDispatch } from '@Contexts/LoginContext/LoginContext';
import { selectEmail, selectIsLoading, selectPassword } from '@Contexts/LoginContext/loginSelectors';
import { setEmail, setPassword } from '@Contexts/LoginContext/loginActions';
import LoginLoading from '@Components/Login/LoginLoading/LoginLoading';
import { LoginState } from '@Contexts/LoginContext/loginReducer';

import { StyledForm, StyledSubmitButton } from './LoginForm.styles';

export interface LoginFormProps {
  onSubmit: (email: LoginState['email'], password: LoginState['password']) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const dispatch = useLoginDispatch();

  const { t } = useTranslation();

  const isLoading = useContextSelector(LoginContext, selectIsLoading);
  const email = useContextSelector(LoginContext, selectEmail);
  const password = useContextSelector(LoginContext, selectPassword);

  const handleChangeEmail = useCallback((newEmail: string) => {
    dispatch(setEmail(newEmail));
  }, [dispatch]);

  const handleChangePassword = useCallback((newPassword: string) => {
    dispatch(setPassword(newPassword));
  }, [dispatch]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onSubmit(email, password);
  }, [email, onSubmit, password]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      {isLoading && <LoginLoading />}
      <LoginField onChange={handleChangeEmail} type="email" value={email} label={t('user.fields.email')}  />
      <LoginField onChange={handleChangePassword} type="password" value={password} label={t('user.fields.password')}  />
      <StyledSubmitButton type="submit" onClick={handleSubmit}>
        {t('common.enter')}
      </StyledSubmitButton>
    </StyledForm>
  );
}
