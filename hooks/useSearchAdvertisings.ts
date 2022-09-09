import { useState, useMemo, useEffect, useCallback } from 'react';
import { IAdvertising, IBreeder, IPoultry, IPoultryRegister } from '@cig-platform/types';
import { useRouter } from 'next/router';
import { useData } from '@cig-platform/data-helper';

import { useAppDispatch, useAppSelector } from '@Contexts/AppContext/AppContext';
import { setIsLoading } from '@Contexts/AppContext/appActions';
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

export type Data = {
  advertisings: PoultryData[];
  pages: number;
}

export default function useSearchAdvertisngs({ initialData = [], initialPages = 0 }: {
  initialData?: PoultryData[],
  initialPages?: number;
}) {
  const [advertisingsData, setAdvertisingsData] = useState<PoultryData[]>(initialData);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(initialPages);

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
  const favoriteExternalId = useMemo(() => query?.favoriteExternalId?.toString() ?? '', [query?.favoriteExternalId]);

  const handleClear = useCallback(() => {
    setAdvertisingsData([]);
    setPage(0);
  }, []);
  
  const handlePaginate = useCallback(() => {
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const modifier = 200; 
    
    if (currentScroll + modifier > documentHeight && page < totalPages - 1 && !isLoading) {
      setPage(page + 1);
      dispatch(setIsLoading(true));
    }
  }, [page, totalPages, isLoading]);

  useEffect(() => {
    const hasFilterOnQueryParams = Boolean(sort || crest || dewlap || gender || genderCategory || tail || type || keyword || prices);
    const needsToClearResults = advertisingsData?.length && advertisingsData?.[0]?.advertising?.id !== initialData?.[0]?.advertising?.id;

    if (hasFilterOnQueryParams && needsToClearResults) {
      handleClear();
    }
  }, [sort, handleClear, crest, dewlap, gender, genderCategory, tail, type, keyword, prices]);

  useEffect(() => {
    document.addEventListener('scroll', handlePaginate);

    return () => document.removeEventListener('scroll', handlePaginate);
  }, [handlePaginate]);
  
  const { data, isLoading: isLoadingGetSearchRequest } = useData<Data>(
    'getSearch', 
    () => ContentSearchService.getSearch({
      crest,
      dewlap,
      gender,
      genderCategory,
      keyword,
      prices,
      sort,
      tail,
      type,
      favoriteExternalId,
      page
    }),
    [
      crest,
      dewlap,
      gender,
      genderCategory,
      keyword,
      prices,
      sort,
      tail,
      type,
      favoriteExternalId,
      page
    ].filter(Boolean),
    {
      initialData: {
        advertisings: initialData,
        pages: initialPages
      }
    }
  );

  useEffect(() => {
    if (!data?.advertisings?.length) return;

    setAdvertisingsData(prevAdvertisings => [
      ...prevAdvertisings,
      ...data?.advertisings?.filter(a =>
        prevAdvertisings.every(pA => pA.advertising.id !== a.advertising.id)
      ) ?? []
    ]);
  }, [data?.advertisings]);

  useEffect(() => {
    dispatch(setIsLoading(isLoadingGetSearchRequest));
  }, [isLoadingGetSearchRequest, dispatch]);

  useEffect(() => {
    setTotalPages(data?.pages ?? 0);
  }, [data?.pages]);

  return useMemo(() => (advertisingsData)?.map((poultryData: PoultryData) =>
    poultryDataToSearchAdvertising(poultryData, favorites)
  ), [advertisingsData, favorites]);
}
