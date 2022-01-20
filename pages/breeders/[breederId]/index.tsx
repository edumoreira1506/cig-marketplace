import { useRouter } from 'next/router';

import MicroFrontend from '@Components/MicroFrontend/MicroFrontend';
import { BREEDER_PAGE_URL } from '@Constants/urls';

const BreederPage = () => {
  const router = useRouter();
  const { breederId } = router.query;

  if (!breederId) return null;

  return (
    <div id="breeder-container">
      <MicroFrontend
        breederId={breederId.toString()}
        name="BreederPage"
        host={BREEDER_PAGE_URL}
        containerId="breeder-container"
      />
    </div>
  );
};

export default BreederPage;
