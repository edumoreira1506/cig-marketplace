import { Title } from '@cig-platform/ui'; 
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

import { RegisterProvider } from '@Contexts/RegisterContext/RegisterContext';

import { StyledRegisterSection, StyledPage, StyledTitleWrapper } from './index.styles';

const RegisterContainer = dynamic(() => import('@Containers/RegisterContainer/RegisterContainer'), {
  ssr: false
});

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
