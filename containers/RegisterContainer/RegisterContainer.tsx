import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '@cig-platform/hooks';
import { Tabs } from '@cig-platform/ui';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import RegisterUserForm from '@Components/Register/RegisterUserForm/RegisterUserForm';
import RegisterBreederForm from '@Components/Register/RegisterBreederForm/RegisterBreederForm';
import useSubmitRegister from '@Hooks/useSubmitRegister';
import { success } from '@Utils/alert';
import { useRegisterDispach, useRegisterSelector } from '@Contexts/RegisterContext/RegisterContext';
import { setRegisterType, setUserField } from '@Contexts/RegisterContext/registerActions';
import { BACKOFFICE_URL } from '@Constants/urls';
import useLogin from '@Hooks/useLogin';
import { selectRegisterType, selectUserEmail, selectUserExternalId, selectUserPassword } from '@Contexts/RegisterContext/registerSelectors';

export default function RegisterContainer() {
  const [tab, setTab] = useState(0);

  const { set } = useLocalStorage<string>('token');

  const dispatch = useRegisterDispach();

  const { t } = useTranslation();

  const userEmail = useRegisterSelector(selectUserEmail);
  const userPassword = useRegisterSelector(selectUserPassword);
  const registerType = useRegisterSelector(selectRegisterType);
  const userExternalId = useRegisterSelector(selectUserExternalId);

  const handleLoginSuccess = useCallback((token: string) => {
    set(token);

    window.location.assign(`${BACKOFFICE_URL}?token=${token}`);
  }, [set]);

  const handleLogin = useLogin({ onSuccess: handleLoginSuccess });

  const handleSubmitUserForm = useCallback(() => {
    setTab(1);
  }, []);

  const handleSuccessForm = useCallback(() => 
    success(
      t('common.success-registered'),
      t,
      () => handleLogin(userEmail, userPassword, registerType, userExternalId)
    ), [t, handleLogin, userEmail, userPassword, userExternalId, registerType]);

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

  const handleReceiveGoogleData = useCallback((response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ((response as GoogleLoginResponse).profileObj) {
      dispatch(setUserField('email', (response as GoogleLoginResponse).profileObj.email));
      dispatch(setUserField('name', (response as GoogleLoginResponse).profileObj.name));
      dispatch(setUserField('externalId', (response as GoogleLoginResponse).profileObj.googleId));
      dispatch(setRegisterType('email'));
      handleSubmitUserForm();
    }
  }, [dispatch]);

  return (
    <Tabs tab={tab} setTab={setTab}>
      <RegisterUserForm
        title={t('common.user')}
        onSubmit={handleSubmitUserForm}
        onGetFacebookData={handleReceiveFacebookData}
        onGetGoogleData={handleReceiveGoogleData}
      />
      <RegisterBreederForm title={t('common.breeder')} onSubmit={handleSubmitRegister} />
    </Tabs>
  );
}
