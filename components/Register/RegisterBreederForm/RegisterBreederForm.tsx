import { useTranslation } from 'react-i18next';
import { Subtitle } from '@cig-platform/ui';

import { RegisterState } from '@Contexts/RegisterContext/registerReducer';
import { preventDefaultHandler } from '@Utils/dom';

import RegisterBreederFormName from './RegisterBreederFormName';
import RegisterBreederFormDescription from './RegisterBreederFormDescription';
import RegisterBreederFormAddressCity from './RegisterBreederFormAddressCity';
import RegisterBreederFormAddressProvince from './RegisterBreederFormAddressProvince';
import RegisterBreederFormAddressStreet from './RegisterBreederFormAddressStreet';
import RegisterBreederFormAddressZipcode from './RegisterBreederFormAddressZipcode';
import RegisterBreederFormSubmitButton from './RegisterBreederFormSubmitButton';
import RegisterBreederFormAddressNumber from './RegisterBreederFormAddressNumber';
import RegisterBreederFormCode from './RegisterBreederFormCode';

import { StyledForm } from './RegisterBreederForm.styles';

export interface RegisterBreederFormProps {
  onSubmit: ({ user, breeder, registerType }: {
    user: RegisterState['user'];
    breeder: RegisterState['breeder'];
    registerType: string;
   }) => void;
  title: string;
}

export default function RegisterBreederForm({ onSubmit, title }: RegisterBreederFormProps) {
  const { t } = useTranslation();
  
  return (
    <StyledForm onSubmit={preventDefaultHandler} title={title}>
      <RegisterBreederFormName />
      <RegisterBreederFormCode />
      <RegisterBreederFormDescription />
      <Subtitle text={t('breeder.fields.address')} />
      <RegisterBreederFormAddressZipcode />
      <RegisterBreederFormAddressCity />
      <RegisterBreederFormAddressProvince />
      <RegisterBreederFormAddressStreet />
      <RegisterBreederFormAddressNumber />
      <RegisterBreederFormSubmitButton onSubmit={onSubmit} />
    </StyledForm>
  );
}
