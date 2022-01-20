import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { BREEDER_PAGE_URL } from '@Constants/urls';

import { StyledContainer } from './index.styles';

const MicroFrontend = dynamic(() => import('@Components/MicroFrontend/MicroFrontend'), {
  ssr: false
});

const BreederPage = () => {
  const router = useRouter();
  const { breederId } = router.query;

  if (!breederId) return null;

  return (
    <StyledContainer id="breeder-container">
      <MicroFrontend
        breederId={breederId.toString()}
        name="BreederPage"
        host={BREEDER_PAGE_URL}
        containerId="breeder-container"
      />
    </StyledContainer>
  );
};

export default BreederPage;
