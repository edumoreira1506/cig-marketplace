import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@cig-platform/ui';

import RegisterProvider from '@Contexts/RegisterContext/RegisterProvider';

import RegisterUserForm from '@Components/Register/RegisterUserForm/RegisterUserForm';

export default function RegisterContainer() {
  const [tab, setTab] = useState(0);

  const { t } = useTranslation();

  const handleSubmitUserForm = useCallback(() => {
    setTab(1);
  }, []);

  return (
    <RegisterProvider>
      <Tabs tab={tab} setTab={setTab}>
        <RegisterUserForm title={t('common.user')} onSubmit={handleSubmitUserForm} />
        <div title={t('common.poultry')}>
        
        </div>
      </Tabs>
    </RegisterProvider>
  );
}
