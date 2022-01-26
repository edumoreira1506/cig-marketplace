import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo, useCallback } from 'react';

import { BREEDER_PAGE_URL } from '@Constants/urls';

import { StyledContainer } from './index.styles';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const MicroFrontend = dynamic(() => import('@cig-platform/microfrontend-helper'), {
  ssr: false
});

const BreederPage = () => {
  const router = useRouter();
  const { breederId } = router.query;

  const microFrontendParams = useMemo(() => ({
    breederId: breederId?.toString() ?? ''
  }), [breederId]);

  const handleNavigateToViewPoultry = useCallback(({ poultryId }: { poultryId: string; }) => {
    if (poultryId) {
      router.push(`/breeders/${breederId}/poultries/${poultryId}`);
    }
  }, [router, breederId]);

  const microFrontEndCallbacks = useMemo<Record<string, any>>(() => ({
    onViewPoultry: handleNavigateToViewPoultry
  }), [handleNavigateToViewPoultry]);

  if (!breederId) return null;

  return (
    <StyledContainer id="breeder-container">
      <MicroFrontend
        params={microFrontendParams}
        name="BreederPage"
        host={BREEDER_PAGE_URL}
        containerId="breeder-container"
        callbacks={microFrontEndCallbacks}
      />
    </StyledContainer>
  );
};

export default BreederPage;
