import { Title } from '@cig-platform/ui'; 
import { useTranslation } from 'react-i18next';

import RegisterContainer from '@Containers/RegisterContainer/RegisterContainer';
import RegisterProvider from '@Contexts/RegisterContext/RegisterProvider';

import { StyledRegisterSection, StyledPage, StyledTitleWrapper } from './index.styles';

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <StyledPage>
      <StyledRegisterSection>
        <StyledTitleWrapper>
          <Title text={t('pages.register')} />
        </StyledTitleWrapper>
        <RegisterProvider>
          <RegisterContainer />
        </RegisterProvider>
      </StyledRegisterSection>
    </StyledPage>
  );
}
