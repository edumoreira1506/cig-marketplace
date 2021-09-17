import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';
import { useRouter } from 'next/router';
import { Tabs } from '@cig-platform/ui';

import RegisterUserForm from '@Components/Register/RegisterUserForm/RegisterUserForm';
import RegisterPoultryForm from '@Components/Register/RegisterPoultryForm/RegisterPoultryForm';
import useSubmitRegister from '@Hooks/useSubmitRegister';
import { error as showError, success } from '@Utils/alert';
import RegisterContext from '@Contexts/RegisterContext/RegisterContext';
import { selectError } from '@Contexts/RegisterContext/registerSelectors';
import { Routes } from '@Constants/routes';

export default function RegisterContainer() {
  const [tab, setTab] = useState(0);

  const router = useRouter();

  const error = useContextSelector(RegisterContext, selectError);

  const { t } = useTranslation();

  const handleSubmitUserForm = useCallback(() => {
    setTab(1);
  }, []);

  const handleSuccessForm = useCallback(() => 
    success(
      t('common.success-registered'),
      t,
      () => router.push(Routes.Login)
    ), [t]);

  const handleSubmitRegister = useSubmitRegister({ onSuccess: handleSuccessForm });

  useEffect(() => {
    if (error) {
      showError(error?.message ?? t('common.something-wrong'), t);
    }
  }, [error]);

  return (
    <Tabs tab={tab} setTab={setTab}>
      <RegisterUserForm title={t('common.user')} onSubmit={handleSubmitUserForm} />
      <RegisterPoultryForm title={t('common.poultry')} onSubmit={handleSubmitRegister} />
    </Tabs>
  );
}
