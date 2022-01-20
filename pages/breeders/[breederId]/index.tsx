import { useRouter } from 'next/router';

import MicroFrontend from '@Components/MicroFrontend/MicroFrontend';
import { BREEDER_PAGE_URL } from '@Constants/urls';

import { StyledContainer } from './index.styles';

import 'react-image-gallery/styles/css/image-gallery.css';

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
