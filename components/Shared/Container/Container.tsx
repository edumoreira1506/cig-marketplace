import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@Contexts/AppContext/AppContext';
import { selectError } from '@Contexts/AppContext/appSelectors';
import { error as showError } from '@Utils/alert';

export interface ContainerProps {
  children: ReactNode | ReactNode[]
}

export default function Container({ children }: ContainerProps) {
  const error = useAppSelector(selectError);

  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      showError(error?.message ?? t('common.something-wrong'), t);
    }
  }, [error, t]);

  return (
    <>
      {children}
    </>
  );
}
