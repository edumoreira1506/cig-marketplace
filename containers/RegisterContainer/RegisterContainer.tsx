import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@cig-platform/ui';

import RegisterUserForm from '@Components/Register/RegisterUserForm/RegisterUserForm';
import RegisterPoultryForm from '@Components/Register/RegisterPoultryForm/RegisterPoultryForm';
import useSubmitRegister from '@Hooks/useSubmitRegister';
import { error, success } from '@Utils/alert';

export default function RegisterContainer() {
  const [tab, setTab] = useState(0);

  const { t } = useTranslation();

  const handleSubmitUserForm = useCallback(() => {
    setTab(1);
  }, []);

  const handleErrorForm = useCallback((errorMessage: string) => error(errorMessage, t), [t]);

  const handleSuccessForm = useCallback(() => success(t('common.success-registered'), t), [t]);

  const handleSubmitRegister = useSubmitRegister({ onError: handleErrorForm, onSuccess: handleSuccessForm });

  return (
    <Tabs tab={tab} setTab={setTab}>
      <RegisterUserForm title={t('common.user')} onSubmit={handleSubmitUserForm} />
      <RegisterPoultryForm title={t('common.poultry')} onSubmit={handleSubmitRegister} />
    </Tabs>
  );
}
