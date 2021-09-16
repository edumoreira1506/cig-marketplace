import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@cig-platform/ui';

import RegisterUserForm from '@Components/Register/RegisterUserForm/RegisterUserForm';
import RegisterPoultryForm from '@Components/Register/RegisterPoultryForm/RegisterPoultryForm';
import { RegisterState } from '@Contexts/RegisterContext/registerReducer';

export default function RegisterContainer() {
  const [tab, setTab] = useState(0);

  const { t } = useTranslation();

  const handleSubmitUserForm = useCallback(() => {
    setTab(1);
  }, []);

  const handleSubmitRegisterForm = useCallback(({ poultry, user }: { poultry: RegisterState['poultry']; user: RegisterState['user'] }) => {
    console.log({ poultry, user });
  }, []);

  return (
    <Tabs tab={tab} setTab={setTab}>
      <RegisterUserForm title={t('common.user')} onSubmit={handleSubmitUserForm} />
      <RegisterPoultryForm title={t('common.poultry')} onSubmit={handleSubmitRegisterForm} />
    </Tabs>
  );
}
