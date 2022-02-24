import React from 'react';
import { AdvertisingItem } from '@cig-platform/ui';
import { useRouter } from 'next/router';

import useSearchAdvertisngs from '@Hooks/useSearchAdvertisings';
import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';

import { StyledAdvertising, StyledAdvertisings, StyledContainer } from './SearchContainer.styles';

export default function SearchContainer() {
  const advertisings = useSearchAdvertisngs();

  const { push } = useRouter();

  return (
    <StyledContainer>
      <StyledAdvertisings>
        {advertisings?.map(advertising => (
          <StyledAdvertising key={advertising.id}>
            <AdvertisingItem
              description={advertising.description}
              placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
              onViewAdvertising={() => push(`/breeders/${advertising.breederId}/poultries/${advertising.poultryId}`)}
              price={advertising.price}
              title={advertising.title}
              image={advertising.image}
            />
          </StyledAdvertising>
        ))}        
      </StyledAdvertisings>
    </StyledContainer>
  );
}
