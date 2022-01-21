import { ReactNode, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { useAppSelector } from '@Contexts/AppContext/AppContext';
import { selectError } from '@Contexts/AppContext/appSelectors';
import { error as showError } from '@Utils/alert';

export interface ContainerProps {
  children: ReactNode | ReactNode[]
}

export default function Container({ children }: ContainerProps) {
  const error = useAppSelector(selectError);

  const { query } = useRouter();

  const logout = useMemo(() => query?.logout === 'true', [query?.logout]);

  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      showError(error?.message ?? t('common.something-wrong'), t);
    }
  }, [error, t]);

  useEffect(() => {
    if (logout) {
      window.localStorage.clear();
      window.location.reload();
    }
  }, [logout]);

  return (
    <>
      {children}
    </>
  );
}
