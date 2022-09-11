import React, { FC, useCallback, useMemo } from 'react';
import { AdvertisingCarousel, AdvertisingCarouselItem } from '@cig-platform/ui';
import Link from 'next/link';

import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';
import { PoultryData } from '@Hooks/useSearchAdvertisings';
import useToggleFavorite from '@Hooks/useToggleFavorite';
import useUser from '@Hooks/useUser';

import {
  StyledContainer,
  StyledCarouselContainer,
} from './HomeContainer.styles';
import ContentSearchService from '@Services/ContentSearchService';
import { useData } from '@cig-platform/data-helper';

export type HomeContainerProps = {
  carousels: {
    title: string;
    identifier: string;
    advertisings: PoultryData[]
  }[]
}

type HomeData = {
  ok: true;
  carousels: {
    title: string;
    identifier: string;
    advertisings: PoultryData[];
  }[];
}

type LinkComponentProps = {
  identifier: 'breeder-link' | 'view-all' | 'view-advertising';
  params?: { identifier?: string }
};

export default function HomeContainer({ carousels: carouselsProps = [] }: HomeContainerProps) {
  const { favorites, id: userId } = useUser();

  const getHome = useCallback(() => ContentSearchService.getHome(userId), [userId]);

  const { data } = useData<HomeData>('home', getHome, [], {
    initialData: {
      carousels: carouselsProps,
      ok: true
    }
  });

  const carousels = useMemo(() => data?.carousels ?? [], [data?.carousels]);

  const toggleFavorite = useToggleFavorite();

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

  return (
    <StyledContainer>
      {carousels?.map(carouselItem => {

        const LinkComponent: FC<LinkComponentProps> = ({
          children,
          identifier,
          params
        }) => {
          const [breederId, poultryId] = params?.identifier?.split('/') ?? ['', ''];
          
          let href = '/';
      
          if (identifier === 'breeder-link') {
            href = `/breeders/${breederId}`;
          }

          if (identifier === 'view-advertising') {
            href = `/breeders/${breederId}/poultries/${poultryId}`;
          }

          if (identifier === 'view-all') {
            if (carouselItem.identifier === 'favorites') {
              href = `/search?favoriteExternalId=${userId}`;
            } else {
              href = `/search?genderCategory=${carouselItem.identifier}`;
            }
          }
        
          return (
            <Link href={href}>
              <a>
                {children}
              </a>
            </Link>
          );
        };

        return (
          <StyledCarouselContainer key={carouselItem.identifier}>
            <AdvertisingCarousel
              advertisings={carouselItem?.advertisings?.map(dataToAdvertisingItem) ?? []}
              linkComponent={LinkComponent}
              title={carouselItem.title}
              placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
              onFavorite={toggleFavorite}
            />
          </StyledCarouselContainer>
        );
      })}
    </StyledContainer>
  );
}
