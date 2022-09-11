import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import { BREEDER_PAGE_URL } from '@Constants/urls';

import { StyledContainer } from './index.styles';

const MicroFrontend = dynamic(() => import('@cig-platform/microfrontend-helper'), {
  ssr: false
});

type LinkComponentProps = {
  identifier: string;
  params?: {
    poultryId?: string
  };
  children?: ReactNode
}

const BreederPage = () => {
  const router = useRouter();
  const { breederId } = router.query;

  const microFrontendParams = ({
    breederId: breederId?.toString() ?? '',
    linkComponent: ({ children, params }: LinkComponentProps) => (
      <a  href={`/breeders/${breederId}/poultries/${params?.poultryId}`}>
        {children}
      </a>
    ) as any
  });

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
