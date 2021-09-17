import { preventDefaultHandler } from '@Utils/dom';

import RegisterUserFormName from './RegisterUserFormName';
import RegisterUserFormEmail from './RegisterUserFormEmail';
import RegisterUserFormPassword from './RegisterUserFormPassword';
import RegisterUserFormConfirmPassword from './RegisterUserFormConfirmPassword';
import RegisterUserFormRegister from './RegisterUserFormRegister';
import RegisterUserFormBirthDate from './RegisterUserFormBirthDate';
import RegisterUserFormSubmitButton from './RegisterUserFormSubmitButton';


export interface RegisterUserFormProps {
  onSubmit: () => void;
  title: string;
}

export default function RegisterUserForm({ onSubmit, title }: RegisterUserFormProps) {
  return (
    <form onSubmit={preventDefaultHandler} title={title}>
      <RegisterUserFormName />
      <RegisterUserFormEmail />
      <RegisterUserFormPassword />
      <RegisterUserFormConfirmPassword />
      <RegisterUserFormRegister />
      <RegisterUserFormBirthDate />
      <RegisterUserFormSubmitButton onSubmit={onSubmit} />
    </form>
  );
}
