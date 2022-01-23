import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { BREEDER_PAGE_URL } from '@Constants/urls';

import { StyledContainer } from './index.styles';

const MicroFrontend = dynamic(() => import('@cig-platform/microfrontend-helper'), {
  ssr: false
});

const BreederPage = () => {
  const router = useRouter();
  const { breederId } = router.query;

  const microFrontendParams = useMemo(() => ({
    breederId: breederId?.toString() ?? ''
  }), [breederId]);

  if (!breederId) return null;

  return (
    <StyledContainer id="breeder-container">
      <MicroFrontend
        params={microFrontendParams}
        name="BreederPage"
        host={BREEDER_PAGE_URL}
        containerId="breeder-container"
      />
    </StyledContainer>
  );
};

export default BreederPage;
