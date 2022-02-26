import { useState, useMemo, useEffect } from 'react';
import { IAdvertising, IBreeder, IPoultry, IPoultryRegister } from '@cig-platform/types';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from '@Services/MarketplaceBffService';
import useUser from '@Hooks/useUser';

export interface PoultryData {
  poultry: IPoultry & {
      mainImage: string;
      breederId: string;
  };
  advertising: IAdvertising;
  breeder: IBreeder;
  measurementAndWeight: IPoultryRegister & {
    metadata: {
      weight?: string;
      measurement?: string;
    }
  }
}

export default function useSearchAdvertisngs() {
  const [advertisingsData, setAdvertisingsData] = useState<PoultryData[]>([]);
  const [filteredData, setFilteredData] = useState<PoultryData[]>([]);

  const dispatch = useAppDispatch();

  const { favorites } = useUser();

  const { query } = useRouter();

  const crest = useMemo(() => query?.crest?.toString().split(',') ?? [], [query?.crest]);
  const dewlap = useMemo(() => query?.dewlap?.toString().split(',') ?? [], [query?.dewlap]);
  const gender = useMemo(() => query?.gender?.toString().split(',') ?? [], [query?.gender]);
  const genderCategory = useMemo(() => query?.genderCategory?.toString().split(',') ?? [], [query?.genderCategory]);
  const keyword = useMemo(() => query?.keyword?.toString(), [query?.keyword]);
  const sort = useMemo(() => query?.sort?.toString(), [query?.sort]);
  const tail = useMemo(() => query?.tail?.toString().split(',') ?? [], [query?.tail]);
  const type = useMemo(() => query?.type?.toString().split(',') ?? [], [query?.type]);
  const prices = useMemo(() => query?.prices ? JSON.parse(query.prices.toString()) : undefined, [query?.prices]);
  const isFavoritesFilterEnabled = useMemo(() => query?.favorites?.toString() === 'true', [query?.favorites]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));

        const advertisings = await MarketplaceBffService.getSearch({
          crest,
          dewlap,
          gender,
          genderCategory,
          keyword,
          prices,
          sort,
          tail,
          type,
          favorites: []
        });

        setAdvertisingsData(advertisings);
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [
    crest,
    dewlap,
    gender,
    genderCategory,
    keyword,
    prices,
    sort,
    tail,
    type,
  ]);

  useEffect(() => {
    setFilteredData(advertisingsData.filter(a => favorites.some(favorite => favorite.advertisingId === a.advertising.id)));
  }, [favorites, advertisingsData]);

  return useMemo(() => (isFavoritesFilterEnabled ? filteredData : advertisingsData)?.map((a: PoultryData) => ({
    title: a.poultry.name,
    price: a.advertising.price,
    description: `${[
      a.poultry.birthDate ? new Intl.DateTimeFormat('pt-BR').format(new Date(a.poultry.birthDate)) : '',
      a.measurementAndWeight.metadata.measurement ? `${a.measurementAndWeight.metadata.measurement} CM` : ''
    ].filter(Boolean).join(' - ')}`,
    image: a.poultry.mainImage ? `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/images/${a.poultry.mainImage}` : undefined,
    id: a.advertising.id,
    breederId: a.breeder.id,
    poultryId: a.poultry.id,
    favorited: favorites.some(f => f.advertisingId === a.advertising.id),
    breederImage: a.breeder.profileImageUrl ? `https://cig-maketplace.s3.sa-east-1.amazonaws.com/breeders/profile/${a.breeder.profileImageUrl}` : undefined
  })), [advertisingsData, favorites, isFavoritesFilterEnabled, filteredData]);
}
