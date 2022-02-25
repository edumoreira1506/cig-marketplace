import { useState, useMemo, useEffect } from 'react';
import { IAdvertising, IBreeder, IPoultry } from '@cig-platform/types';
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
}

export default function useSearchAdvertisngs() {
  const [advertisingsData, setAdvertisingsData] = useState<PoultryData[]>();

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
          favorites: isFavoritesFilterEnabled ? favorites.map(f => f.advertisingId) : []
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
    isFavoritesFilterEnabled,
    favorites
  ]);

  return useMemo(() => advertisingsData?.map((a: PoultryData) => ({
    title: a.poultry.name,
    price: a.advertising.price,
    description: a.poultry.description,
    image: a.poultry.mainImage,
    id: a.advertising.id,
    breederId: a.breeder.id,
    poultryId: a.poultry.id,
    favorited: favorites.some(f => f.advertisingId === a.advertising.id)
  })), [advertisingsData, favorites]);
}
