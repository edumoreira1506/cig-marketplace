import { useRouter } from 'next/router';

import MicroFrontend from '@Components/MicroFrontend/MicroFrontend';
import { POULTRY_PAGE_URL } from '@Constants/urls';

import 'react-image-gallery/styles/css/image-gallery.css';

const PoultryPage = () => {
  const router = useRouter();
  const { breederId, poultryId } = router.query;

  if (!breederId || !poultryId) return null;

  return (
    <div id="poultry-container">
      <MicroFrontend
        breederId={breederId.toString()}
        poultryId={poultryId.toString()}
        name="PoultryPage"
        host={POULTRY_PAGE_URL}
        containerId="poultry-container"
      />
    </div>
  );
};

export default PoultryPage;
