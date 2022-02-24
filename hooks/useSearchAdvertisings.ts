import { useState, useMemo, useEffect } from 'react';
import { IAdvertising, IBreeder, IPoultry } from '@cig-platform/types';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from '@Services/MarketplaceBffService';

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

  const { query } = useRouter();

  const crest = useMemo(() => query?.crest?.toString(), [query?.crest]);
  const dewlap = useMemo(() => query?.dewlap?.toString(), [query?.dewlap]);
  const gender = useMemo(() => query?.gender?.toString(), [query?.gender]);
  const genderCategory = useMemo(() => query?.genderCategory?.toString(), [query?.genderCategory]);
  const keyword = useMemo(() => query?.keyword?.toString(), [query?.keyword]);
  const sort = useMemo(() => query?.sort?.toString(), [query?.sort]);
  const tail = useMemo(() => query?.tail?.toString(), [query?.tail]);
  const type = useMemo(() => query?.type?.toString(), [query?.type]);
  const prices = useMemo(() => query?.prices ? JSON.parse(query.prices.toString()) : undefined, [query?.prices]);

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

  return useMemo(() => advertisingsData?.map((a: PoultryData) => ({
    title: a.poultry.name,
    price: a.advertising.price,
    description: a.poultry.description,
    image: a.poultry.mainImage,
    id: a.advertising.id,
    breederId: a.breeder.id,
    poultryId: a.poultry.id
  })), [advertisingsData]);
}
