import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AiFillFacebook, AiOutlineGoogle } from 'react-icons/ai';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { preventDefaultHandler } from '@Utils/dom';
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '@Constants/urls';

import RegisterUserFormName from './RegisterUserFormName';
import RegisterUserFormEmail from './RegisterUserFormEmail';
import RegisterUserFormPassword from './RegisterUserFormPassword';
import RegisterUserFormConfirmPassword from './RegisterUserFormConfirmPassword';
import RegisterUserFormRegister from './RegisterUserFormRegister';
import RegisterUserFormBirthDate from './RegisterUserFormBirthDate';
import RegisterUserFormSubmitButton from './RegisterUserFormSubmitButton';

import { StyledFacebookButton, StyledGoogleButton } from './RegisterUserForm.styles';

export interface RegisterUserFormProps {
  onSubmit: () => void;
  onGetFacebookData: ({
    name,
    email,
    userID,
  }: {
    name: string;
    email: string;
    userID: string;
  }) => void;
  onGetGoogleData: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  title: string;
}

export default function RegisterUserForm({
  onSubmit,
  title,
  onGetFacebookData,
  onGetGoogleData
}: RegisterUserFormProps) {
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
        redirectUri={window.location.href}
        render={(props: any) => (
          <StyledFacebookButton
            {...props}
            onClick={(e: React.FormEvent<HTMLFormElement>) => {
              preventDefaultHandler(e), props.onClick();
            }}
          >
            Continuar com facebook
            <AiFillFacebook />
          </StyledFacebookButton>
        )}
      />
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={onGetGoogleData}
        render={(props: any) => (
          <StyledGoogleButton
            {...props}
            onClick={(e: React.FormEvent<HTMLFormElement>) => {
              preventDefaultHandler(e), props.onClick();
            }}
          >
            Continuar com gmail
            <AiOutlineGoogle />
          </StyledGoogleButton>
        )}
      />
    </form>
  );
}
