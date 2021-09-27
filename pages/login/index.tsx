import LoginContainer from '@Containers/LoginContainer/LoginContainer';
import { LoginProvider } from '@Contexts/LoginContext/LoginContext';

import { StyledContainer, StyledFormWrapper, StyledPage } from './index.styles';

export default function LoginPage() {
  return (
    <StyledPage>
      <StyledContainer>
        <StyledFormWrapper>
          <LoginProvider>
            <LoginContainer />
          </LoginProvider>
        </StyledFormWrapper>
      </StyledContainer>
    </StyledPage>
  );
}
