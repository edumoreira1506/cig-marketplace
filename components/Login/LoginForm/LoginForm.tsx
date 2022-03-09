import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import LoginField from '@Components/Login/LoginField/LoginField';
import { useLoginDispatch, useLoginSelector } from '@Contexts/LoginContext/LoginContext';
import { selectEmail, selectIsLoading, selectPassword } from '@Contexts/LoginContext/loginSelectors';
import { setEmail, setPassword } from '@Contexts/LoginContext/loginActions';
import LoginLoading from '@Components/Login/LoginLoading/LoginLoading';
import { LoginState } from '@Contexts/LoginContext/loginReducer';

import {
  StyledForm,
  StyledSubmitButton,
  StyledSocialMediaButtons,
  StyledFacebookButton,
  StyledGoogleButton
} from './LoginForm.styles';
import { AiFillFacebook, AiOutlineGoogle } from 'react-icons/ai';
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '@Constants/urls';
import { preventDefaultHandler } from '@Utils/dom';
import { UserRegisterTypeEnum } from '@cig-platform/enums';

export interface LoginFormProps {
  onSubmit: (email: LoginState['email'], password: LoginState['password'], type?: string, externalId?: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const dispatch = useLoginDispatch();

  const { t } = useTranslation();

  const isLoading = useLoginSelector(selectIsLoading);
  const email = useLoginSelector(selectEmail);
  const password = useLoginSelector(selectPassword);

  const handleChangeEmail = useCallback((newEmail: string) => {
    dispatch(setEmail(newEmail));
  }, [dispatch]);

  const handleChangePassword = useCallback((newPassword: string) => {
    dispatch(setPassword(newPassword));
  }, [dispatch]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onSubmit(email, password);
  }, [email, onSubmit, password]);

  const handleFacebookLogin = useCallback(({ email, userID }: {
    email: string;
    userID: string;
  }) => {
    if (email && userID) {
      onSubmit(email, '', UserRegisterTypeEnum.Facebook, userID);
    }
  }, [onSubmit]);

  const handleGoogleLogin = useCallback((response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ((response as GoogleLoginResponse).profileObj) {
      onSubmit((response as GoogleLoginResponse).profileObj.email, '', UserRegisterTypeEnum.Gmail, (response as GoogleLoginResponse).profileObj.googleId);
    }
  }, [dispatch, onSubmit]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      {isLoading && <LoginLoading />}
      <LoginField onChange={handleChangeEmail} type="email" value={email} label={t('user.fields.email')}  />
      <LoginField onChange={handleChangePassword} type="password" value={password} label={t('user.fields.password')}  />
      <StyledSubmitButton type="submit" onClick={handleSubmit}>
        {t('common.enter')}
      </StyledSubmitButton>
      <StyledSocialMediaButtons>
        <FacebookLogin
          appId={FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email"
          callback={handleFacebookLogin}
          render={(props: any) => (
            <StyledFacebookButton {...props} onClick={(e: React.FormEvent<HTMLFormElement>) => {
              preventDefaultHandler(e),
              props.onClick();
            }} type="button">
              <AiFillFacebook />
            </StyledFacebookButton>
          )}
        />
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={handleGoogleLogin}
          render={(props: any) => (
            <StyledGoogleButton
              {...props}
              onClick={(e: React.FormEvent<HTMLFormElement>) => {
                preventDefaultHandler(e), props.onClick();
              }}
              type="button"
            >
              <AiOutlineGoogle />
            </StyledGoogleButton>
          )}
        />
      </StyledSocialMediaButtons>
    </StyledForm>
  );
}
