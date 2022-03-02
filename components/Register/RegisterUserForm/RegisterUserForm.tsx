import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { preventDefaultHandler } from '@Utils/dom';
import { FACEBOOK_APP_ID } from '@Constants/urls';

import RegisterUserFormName from './RegisterUserFormName';
import RegisterUserFormEmail from './RegisterUserFormEmail';
import RegisterUserFormPassword from './RegisterUserFormPassword';
import RegisterUserFormConfirmPassword from './RegisterUserFormConfirmPassword';
import RegisterUserFormRegister from './RegisterUserFormRegister';
import RegisterUserFormBirthDate from './RegisterUserFormBirthDate';
import RegisterUserFormSubmitButton from './RegisterUserFormSubmitButton';

import { StyledFacebookButton } from './RegisterUserForm.styles';

export interface RegisterUserFormProps {
  onSubmit: () => void;
  onGetFacebookData: ({ name, email, userID }: { name: string; email: string; userID: string }) => void;
  title: string;
}

export default function RegisterUserForm({ onSubmit, title, onGetFacebookData }: RegisterUserFormProps) {
  return (
    <form onSubmit={preventDefaultHandler} title={title}>
      <RegisterUserFormName />
      <RegisterUserFormEmail />
      <RegisterUserFormPassword />
      <RegisterUserFormConfirmPassword />
      <RegisterUserFormRegister />
      <RegisterUserFormBirthDate />
      <RegisterUserFormSubmitButton onSubmit={onSubmit} />
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email"
        callback={onGetFacebookData}
        render={(props: any) => (
          <StyledFacebookButton {...props} onClick={(e: React.FormEvent<HTMLFormElement>) => {
            preventDefaultHandler(e),
            props.onClick();
          }}>
              Cadastro com facebook
          </StyledFacebookButton>
        )}
      />
    </form>
  );
}
