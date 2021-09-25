import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import Link from 'next/link';
import { useLocalStorage } from '@cig-platform/hooks';

import { error as showError } from '@Utils/alert';
import LoginContext from '@Contexts/LoginContext/LoginContext';
import { selectError } from '@Contexts/LoginContext/loginSelectors';
import useLogin from '@Hooks/useLogin';
import LoginForm from '@Components/Login/LoginForm/LoginForm';
import { Routes } from '@Constants/routes';
import { BACKOFFICE_URL } from '@Constants/urls';

import { StyledLink } from './LoginContainer.styles';

export default function LoginContainer() {
  const error = useContextSelector(LoginContext, selectError);

  const { set } = useLocalStorage<string>('token');

  const { t } = useTranslation();

  const handleSuccessForm = useCallback((token: string) => {
    set(token);
    window.location.assign(BACKOFFICE_URL);
  }, [set]);

  const handleLogin = useLogin({ onSuccess: handleSuccessForm });

  useEffect(() => {
    if (error) {
      showError(error?.message ?? t('common.something-wrong'), t);
    }
  }, [error]);

  return (
    <>
      <LoginForm onSubmit={handleLogin} />
      <StyledLink>
        <Link href={Routes.Register}>
          {t('common.sign-up')}
        </Link>
      </StyledLink>
    </>
  );
}
