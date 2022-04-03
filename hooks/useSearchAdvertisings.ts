import { useState, useMemo, useEffect, useCallback } from 'react';
import { IAdvertising, IBreeder, IPoultry, IPoultryRegister } from '@cig-platform/types';
import { useRouter } from 'next/router';
import { useDebouncedEffect } from '@cig-platform/hooks';

import { useAppDispatch, useAppSelector } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import ContentSearchService from '@Services/ContentSearchService';
import useUser from '@Hooks/useUser';
import { selectIsLoading } from '@Contexts/AppContext/appSelectors';
import { poultryDataToSearchAdvertising } from '@Formatters/searchFormatters';

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

export default function useSearchAdvertisngs({ initialData = [], initialPages = 0 }: {
  initialData?: PoultryData[],
  initialPages?: number;
}) {
  const [advertisingsData, setAdvertisingsData] = useState<PoultryData[]>(initialData);
  const [filteredData, setFilteredData] = useState<PoultryData[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(initialPages);
  const [isFirstAccess, setIsFirstAccess] = useState(true);

  const isLoading = useAppSelector(selectIsLoading);

  const dispatch = useAppDispatch();

  const { favorites } = useUser();

  const { query } = useRouter();

  const crest = useMemo(() => query?.crest?.toString().split(','), [query?.crest]);
  const dewlap = useMemo(() => query?.dewlap?.toString().split(','), [query?.dewlap]);
  const gender = useMemo(() => query?.gender?.toString().split(','), [query?.gender]);
  const genderCategory = useMemo(() => query?.genderCategory?.toString().split(','), [query?.genderCategory]);
  const keyword = useMemo(() => query?.keyword?.toString(), [query?.keyword]);
  const sort = useMemo(() => query?.sort?.toString(), [query?.sort]);
  const tail = useMemo(() => query?.tail?.toString().split(','), [query?.tail]);
  const type = useMemo(() => query?.type?.toString().split(','), [query?.type]);
  const prices = useMemo(() => query?.prices ? JSON.parse(query.prices.toString()) : undefined, [query?.prices]);
  const isFavoritesFilterEnabled = useMemo(() => query?.favorites?.toString() === 'true', [query?.favorites]);

  const handleClear = useCallback(() => {
    setAdvertisingsData([]);
    setPage(0);
  }, []);

  const handlePaginate = useCallback(() => {
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const modifier = 200; 
    
    if (currentScroll + modifier > documentHeight && page < totalPages - 1 && !isLoading) {
      setIsFirstAccess(false);
      setPage(page + 1);
      dispatch(setIsLoading(true));
    }
  }, [page, totalPages, isLoading]);

  useEffect(() => {
    const hasFilterOnQueryParams = Boolean(sort || crest || dewlap || gender || genderCategory || tail || type || keyword || prices);
    const needsToClearResults = advertisingsData?.length && advertisingsData?.[0]?.advertising?.id !== initialData?.[0]?.advertising?.id;

    if (hasFilterOnQueryParams && needsToClearResults) {
      handleClear();
      setIsFirstAccess(false);
    }
  }, [sort, handleClear, crest, dewlap, gender, genderCategory, tail, type, keyword, prices]);

  useEffect(() => {
    document.addEventListener('scroll', handlePaginate);

    return () => document.removeEventListener('scroll', handlePaginate);
  }, [handlePaginate]);

  useDebouncedEffect(() => {
    if (isFirstAccess) return;

    (async () => {
      try {
        dispatch(setIsLoading(true));

        const { advertisings, pages } = await ContentSearchService.getSearch({
          crest,
          dewlap,
          gender,
          genderCategory,
          keyword,
          prices,
          sort,
          tail,
          type,
          favorites: [],
          page
        });

        setAdvertisingsData(prevAdvertisings => [...prevAdvertisings, ...advertisings]);
        setTotalPages(pages);
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, 1000, [
    isFirstAccess,
    crest,
    dewlap,
    gender,
    genderCategory,
    keyword,
    prices,
    sort,
    tail,
    type,
    page
  ]);

  useEffect(() => {
    setFilteredData(advertisingsData.filter(a => favorites.some(favorite => favorite.advertisingId === a.advertising.id)));
  }, [favorites, advertisingsData]);

  return useMemo(() => (isFavoritesFilterEnabled ? filteredData : advertisingsData)?.map((poultryData: PoultryData) =>
    poultryDataToSearchAdvertising(poultryData, favorites)
  ), [advertisingsData, favorites, isFavoritesFilterEnabled, filteredData]);
}
