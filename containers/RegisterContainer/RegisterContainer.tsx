import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Tabs } from '@cig-platform/ui';

import RegisterUserForm from '@Components/Register/RegisterUserForm/RegisterUserForm';
import RegisterBreederForm from '@Components/Register/RegisterBreederForm/RegisterBreederForm';
import useSubmitRegister from '@Hooks/useSubmitRegister';
import { success } from '@Utils/alert';
import { Routes } from '@Constants/routes';
import { useRegisterDispach } from '@Contexts/RegisterContext/RegisterContext';
import { setRegisterType, setUserField } from '@Contexts/RegisterContext/registerActions';

export default function RegisterContainer() {
  const [tab, setTab] = useState(0);

  const dispatch = useRegisterDispach();

  const router = useRouter();

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

  const handleReceiveFacebookData = useCallback(({ name, email, userID }: {
    name: string;
    email: string;
    userID: string;
  }) => {
    dispatch(setUserField('email', email));
    dispatch(setUserField('name', name));
    dispatch(setUserField('externalId', userID));
    dispatch(setRegisterType('facebook'));
    handleSubmitUserForm();
  }, [dispatch]);

  return (
    <Tabs tab={tab} setTab={setTab}>
      <RegisterUserForm
        title={t('common.user')}
        onSubmit={handleSubmitUserForm}
        onGetFacebookData={handleReceiveFacebookData}
      />
      <RegisterBreederForm title={t('common.breeder')} onSubmit={handleSubmitRegister} />
    </Tabs>
  );
}
