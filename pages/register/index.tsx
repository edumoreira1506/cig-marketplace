import { Title } from '@cig-platform/ui'; 
import { useTranslation } from 'react-i18next';

import RegisterContainer from '@Containers/RegisterContainer/RegisterContainer';

import { StyledRegisterSection, StyledPage } from './index.styles';

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <StyledPage>
      <StyledRegisterSection>
        <Title text={t('pages.register')} />
        <RegisterContainer />
      </StyledRegisterSection>
    </StyledPage>
  );
}
