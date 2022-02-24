import React, { useCallback, useEffect, useState } from 'react';
import { AdvertisingCarousel, AdvertisingCarouselItem } from '@cig-platform/ui';
import { useRouter } from 'next/router';
import { PoultryGenderCategoryEnum } from '@cig-platform/enums';

import { useAppDispatch, useAppSelector } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from '@Services/MarketplaceBffService';
import { selectIsLoading } from '@Contexts/AppContext/appSelectors';
import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';
import { PoultryData } from '@Hooks/useSearchAdvertisings';

import { StyledContainer, StyledCarouselContainer } from './HomeContainer.styles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type AdvertisingItem = {
  price: number;
  description: string;
  breederImage?: string;
  image?: string;
  identifier: string;
}

export default function HomeContainer() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);

  const router = useRouter();

  const [matrixes, setMatrixes] = useState<AdvertisingItem[]>([]);
  const [reproductives, setReproductives] = useState<AdvertisingItem[]>([]);
  const [maleChickens, setMaleChickens] = useState<AdvertisingItem[]>([]);
  const [femaleChickens, setFemaleChickens] = useState<AdvertisingItem[]>([]);

  const handleViewAdvertising = useCallback((identifier: string) => {
    const [breederId, poultryId] = identifier.split('/');

    router.push(`/breeders/${breederId}/poultries/${poultryId}`);
  }, [router]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));

        const data = await MarketplaceBffService.getHome();

        const dataToAdvertisingItem = (d: PoultryData): AdvertisingCarouselItem => ({
          description: d.poultry.description,
          identifier: `${d.breeder.id}/${d.poultry.id}`,
          price: d.advertising.price,
          breederImage: d.breeder.profileImageUrl,
          image: d.poultry.mainImage
        });

        setMatrixes(data.matrixes.map(dataToAdvertisingItem));
        setReproductives(data.reproductives.map(dataToAdvertisingItem));
        setFemaleChickens(data.femaleChickens.map(dataToAdvertisingItem));
        setMaleChickens(data.maleChickens.map(dataToAdvertisingItem));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [dispatch]);

  if (isLoading) return null;

  return (
    <StyledContainer>
      {Boolean(matrixes.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={matrixes}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() => router.push(`/search?genderCategory=${PoultryGenderCategoryEnum.Matrix}`)}
            title="Matrizes"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
          />
        </StyledCarouselContainer>
      )}

      {Boolean(reproductives.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={reproductives}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() => router.push(`/search?genderCategory=${PoultryGenderCategoryEnum.Reproductive}`)}
            title="Reprodutores"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
          />
        </StyledCarouselContainer>
      )}

      {Boolean(maleChickens.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={maleChickens}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() => router.push(`/search?genderCategory=${PoultryGenderCategoryEnum.MaleChicken}`)}
            title="Frangos"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
          />
        </StyledCarouselContainer>
      )}

      {Boolean(femaleChickens.length) && (
        <StyledCarouselContainer>
          <AdvertisingCarousel
            advertisings={femaleChickens}
            onViewAdvertising={handleViewAdvertising}
            onViewAll={() => router.push(`/search?genderCategory=${PoultryGenderCategoryEnum.MaleChicken}`)}
            title="Frangas"
            placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
          />
        </StyledCarouselContainer>
      )}
    </StyledContainer>
  );
}
