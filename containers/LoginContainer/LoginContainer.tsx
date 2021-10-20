import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useLocalStorage } from '@cig-platform/hooks';

import { success } from '@Utils/alert';
import useLogin from '@Hooks/useLogin';
import LoginForm from '@Components/Login/LoginForm/LoginForm';
import { Routes } from '@Constants/routes';
import { BACKOFFICE_URL } from '@Constants/urls';
import useRecoverPassword from '@Hooks/useRecoverPassword';

import { StyledLink, StyledLinks } from './LoginContainer.styles';

export default function LoginContainer() {
  const { set } = useLocalStorage<string>('token');

  const { t } = useTranslation();

  const handleSuccessForm = useCallback((token: string) => {
    set(token);

    window.location.assign(`${BACKOFFICE_URL}?token=${token}`);
  }, [set]);

  const handleLogin = useLogin({ onSuccess: handleSuccessForm });

  const handleRecoverPasswordSuccess = useCallback(() => {
    success(t('recover-password.success.message'), t);
  }, [t]);

  const handleRecoverPassword = useRecoverPassword({ onSuccess: handleRecoverPasswordSuccess });

  return (
    <>
      <LoginForm onSubmit={handleLogin} />
      <StyledLinks>
        <StyledLink>
          <Link href={Routes.Register}>
            <a>
              {t('common.sign-up')}
            </a>
          </Link>
        </StyledLink>
        <StyledLink onClick={handleRecoverPassword}>
          {t('common.recover-password')}
        </StyledLink>
      </StyledLinks>
    </>
  );
}
