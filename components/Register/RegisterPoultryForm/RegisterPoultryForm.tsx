import { useTranslation } from 'react-i18next';
import { Subtitle } from '@cig-platform/ui';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';

import RegisterPoultryFormName from './RegisterPoultryFormName';
import RegisterPoultryFormDescription from './RegisterPoultryFormDescription';
import RegisterPoultryFormAddressCity from './RegisterPoultryFormAddressCity';
import RegisterPoultryFormAddressProvince from './RegisterPoultryFormAddressProvince';
import RegisterPoultryFormAddressStreet from './RegisterPoultryFormAddressStreet';
import RegisterPoultryFormAddressZipcode from './RegisterPoultryFormAddressZipcode';
import RegisterPoultryFormSubmitButton from './RegisterPoultryFormSubmitButton';
import { preventDefaultHandler } from '@Utils/dom';

export interface RegisterPoultryFormProps {
  onSubmit: ({ user, poultry }: { user: RegisterState['user']; poultry: RegisterState['poultry'] }) => void;
  title: string;
}

export default function RegisterPoultryForm({ onSubmit, title }: RegisterPoultryFormProps) {
  const { t } = useTranslation();
  
  return (
    <form onSubmit={preventDefaultHandler} title={title}>
      <RegisterPoultryFormName />
      <RegisterPoultryFormDescription />
      <Subtitle text={t('poultry.fields.address')} />
      <RegisterPoultryFormAddressCity />
      <RegisterPoultryFormAddressProvince />
      <RegisterPoultryFormAddressStreet />
      <RegisterPoultryFormAddressZipcode />
      <RegisterPoultryFormSubmitButton onSubmit={onSubmit} />
    </form>
  );
}
