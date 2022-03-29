import React, { useCallback, useEffect, useState } from 'react';
import { AdvertisingCarousel, AdvertisingCarouselItem } from '@cig-platform/ui';
import { useRouter } from 'next/router';
import { PoultryGenderCategoryEnum } from '@cig-platform/enums';

import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';
import { PoultryData } from '@Hooks/useSearchAdvertisings';
import useToggleFavorite from '@Hooks/useToggleFavorite';
import useUser from '@Hooks/useUser';

import {
  StyledContainer,
  StyledCarouselContainer,
} from './HomeContainer.styles';

type AdvertisingItem = {
  price: number;
  description: string;
  breederImage?: string;
  image?: string;
  identifier: string;
};

export type HomeContainerProps = {
  advertisings: {
    maleChickens: PoultryData[];
    femaleChickens: PoultryData[];
    matrixes: PoultryData[];
    reproductives: PoultryData[];
  }
}

export default function HomeContainer({ advertisings }: HomeContainerProps) {
  const toggleFavorite = useToggleFavorite();

  const { favorites } = useUser();

  const router = useRouter();

  const [matrixes, setMatrixes] = useState<AdvertisingItem[]>([]);
  const [reproductives, setReproductives] = useState<AdvertisingItem[]>([]);
  const [maleChickens, setMaleChickens] = useState<AdvertisingItem[]>([]);
  const [femaleChickens, setFemaleChickens] = useState<AdvertisingItem[]>([]);

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

  useEffect(() => {
    const dataToAdvertisingItem = (
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
    });

    setMatrixes(advertisings.matrixes.map(dataToAdvertisingItem));
    setReproductives(advertisings.reproductives.map(dataToAdvertisingItem));
    setFemaleChickens(advertisings.femaleChickens.map(dataToAdvertisingItem));
    setMaleChickens(advertisings.maleChickens.map(dataToAdvertisingItem));
  }, [favorites, advertisings]);

  return (
    <StyledContainer>
      {Boolean(matrixes.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={matrixes}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() =>
              router.push(
                `/search?genderCategory=${PoultryGenderCategoryEnum.Matrix}`
              )
            }
            title="Matrizes"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
            onFavorite={toggleFavorite}
            onViewBreeder={handleViewBreeder}
          />
        </StyledCarouselContainer>
      )}

      {Boolean(reproductives.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={reproductives}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() =>
              router.push(
                `/search?genderCategory=${PoultryGenderCategoryEnum.Reproductive}`
              )
            }
            title="Reprodutores"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
            onViewBreeder={handleViewBreeder}
            onFavorite={toggleFavorite}
          />
        </StyledCarouselContainer>
      )}

      {Boolean(maleChickens.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={maleChickens}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() =>
              router.push(
                `/search?genderCategory=${PoultryGenderCategoryEnum.MaleChicken}`
              )
            }
            title="Frangos"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
            onViewBreeder={handleViewBreeder}
            onFavorite={toggleFavorite}
          />
        </StyledCarouselContainer>
      )}

      {Boolean(femaleChickens.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={femaleChickens}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() =>
              router.push(
                `/search?genderCategory=${PoultryGenderCategoryEnum.MaleChicken}`
              )
            }
            title="Frangas"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
            onViewBreeder={handleViewBreeder}
            onFavorite={toggleFavorite}
          />
        </StyledCarouselContainer>
      )}
    </StyledContainer>
  );
}
