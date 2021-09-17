import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import Link from 'next/link';

import { error as showError, success } from '@Utils/alert';
import LoginContext from '@Contexts/LoginContext/LoginContext';
import { selectError } from '@Contexts/LoginContext/loginSelectors';
import useLogin from '@Hooks/useLogin';
import LoginForm from '@Components/Login/LoginForm/LoginForm';
import { StyledLink } from './LoginContainer.styles';
import { Routes } from '@Constants/routes';

export default function LoginContainer() {
  const error = useContextSelector(LoginContext, selectError);

  const { t } = useTranslation();

  const handleSuccessForm = useCallback(() => success(t('common.success'), t), [t]);

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
