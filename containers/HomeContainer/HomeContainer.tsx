import React, { useCallback } from 'react';
import { AdvertisingCarousel, AdvertisingCarouselItem } from '@cig-platform/ui';
import { useRouter } from 'next/router';

import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';
import { PoultryData } from '@Hooks/useSearchAdvertisings';
import useToggleFavorite from '@Hooks/useToggleFavorite';
import useUser from '@Hooks/useUser';

import {
  StyledContainer,
  StyledCarouselContainer,
} from './HomeContainer.styles';

export type HomeContainerProps = {
  carousels: {
    title: string;
    identifier: string;
    advertisings?: PoultryData[]
  }[]
}

export default function HomeContainer({ carousels = [] }: HomeContainerProps) {
  const toggleFavorite = useToggleFavorite();

  const { favorites, id: userId } = useUser();

  const router = useRouter();

  const dataToAdvertisingItem = useCallback((
    d: PoultryData
  ): AdvertisingCarouselItem => ({
    description: `${[
      d.poultry.birthDate ? new Intl.DateTimeFormat('pt-BR').format(new Date(d.poultry.birthDate)) : '',
      d?.measurementAndWeight?.metadata?.measurement ? `${d.measurementAndWeight.metadata.measurement} CM` : ''
    ].filter(Boolean).join(' - ')}`,
    identifier: `${d.breeder.id}/${d.poultry.id}/${d.advertising.id}`,
    price: d.advertising.price,
    breederImage: d.breeder.profileImageUrl ? `https://cig-maketplace.s3.sa-east-1.amazonaws.com/breeders/profile/${d.breeder.profileImageUrl}` : undefined,
    image: d.poultry.mainImage ? `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/images/${d.poultry.mainImage}` : undefined,
    favorited: favorites.some(
      (f) => f.advertisingId === d.advertising.id
    ),
  }), [favorites]);

  const handleViewAdvertising = useCallback(
    (identifier: string) => {
      const [breederId, poultryId] = identifier.split('/');

      router.push(`/breeders/${breederId}/poultries/${poultryId}`);
    },
    [router]
  );

  const handleViewBreeder = useCallback(
    (identifier: string) => {
      const [breederId] = identifier.split('/');

      router.push(`/breeders/${breederId}`);
    },
    [router]
  );

  return (
    <StyledContainer>
      {carousels.map(carouselItem => (
        <StyledCarouselContainer key={carouselItem.identifier}>
          <AdvertisingCarousel
            advertisings={carouselItem.advertisings?.map(dataToAdvertisingItem) ?? []}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() => {
              if (carouselItem.identifier === 'favorites') {
                `/search?favoriteExternalId=${userId}`;
              } else {
                router.push(
                  `/search?genderCategory=${carouselItem.identifier}`
                );
              }
            }}
            title={carouselItem.title}
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
            onFavorite={toggleFavorite}
            onViewBreeder={handleViewBreeder}
          />
        </StyledCarouselContainer>
      ))}
    </StyledContainer>
  );
}
