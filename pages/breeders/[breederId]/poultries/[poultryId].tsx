import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { POULTRY_PAGE_URL } from '@Constants/urls';

import { StyledContainer } from './[poultryId].styles';

const MicroFrontend = dynamic(() => import('@cig-platform/microfrontend-helper'), {
  ssr: false
});

const PoultryPage = () => {
  const router = useRouter();
  const { breederId, poultryId } = router.query;

  const microFrontendParams = useMemo(() => ({
    poultryId: poultryId?.toString() ?? '',
    breederId: breederId?.toString() ?? '',
  }), [breederId, poultryId]);

  if (!breederId || !poultryId) return null;

  return (
    <StyledContainer id="poultry-container">
      <MicroFrontend
        params={microFrontendParams}
        name="PoultryPage"
        host={POULTRY_PAGE_URL}
        containerId="poultry-container"
      />
    </StyledContainer>
  );
};

export default PoultryPage;
