import React, { useCallback, useEffect, useState } from 'react';
import {
  AdvertisingItem,
  ConfigModal,
  SquareButton,
  SelectedList,
  Expand,
  Button,
} from '@cig-platform/ui';
import { useRouter } from 'next/router';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { BiFilterAlt } from 'react-icons/bi';
import {
  PoultryCrestEnum,
  PoultryDewlapEnum,
  PoultryGenderCategoryEnum,
  PoultryGenderEnum,
  PoultryTailEnum,
  PoultryTypeEnum,
} from '@cig-platform/enums';

import useSearchAdvertisngs, { PoultryData } from '@Hooks/useSearchAdvertisings';
import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';
import useToggleFavorite from '@Hooks/useToggleFavorite';

import {
  StyledAdvertising,
  StyledAdvertisings,
  StyledContainer,
  StyledFilter,
  StyledFilters,
  StyledFilterModalContainer,
  StyledFilterModalItem,
  StyledConfirmButton,
  StyledPriceFilter,
  StyledPriceDot,
  StyledPrice,
  StyledPriceFilterArea,
  PriceFilterStyle,
  StyledPriceInput
} from './SearchContainer.styles';
import useAuth from '@Hooks/useAuth';

export const sortListItems = [
  {
    label: 'Menor preço',
    value: 'MIN_TO_MAX',
  },
  {
    label: 'Maior preço',
    value: 'MAX_TO_MIN',
  },
];

export const crestListItems = [
  {
    value: PoultryCrestEnum.Ball,
    label: 'Bola',
  },
  {
    value: PoultryCrestEnum.Pea,
    label: 'Ervilha',
  },
];

export const dewlapListItems = [
  {
    value: PoultryDewlapEnum.DOUBLE,
    label: 'Dupla',
  },
  {
    value: PoultryDewlapEnum.EMPTY,
    label: 'Ausência total',
  },
  {
    value: PoultryDewlapEnum.SINGLE,
    label: 'Única',
  },
];

export const genderListItems = [
  {
    value: PoultryGenderEnum.Female,
    label: 'Fêmea',
  },
  {
    value: PoultryGenderEnum.Male,
    label: 'Macho',
  },
];

export const genderCategoryListItems = [
  {
    value: PoultryGenderCategoryEnum.FemaleChicken,
    label: 'Franga',
  },
  {
    value: PoultryGenderCategoryEnum.MaleChicken,
    label: 'Frango',
  },
  {
    value: PoultryGenderCategoryEnum.Matrix,
    label: 'Matriz',
  },
  {
    value: PoultryGenderCategoryEnum.Reproductive,
    label: 'Reprodutor',
  },
];

export const tailListItems = [
  {
    value: PoultryTailEnum.HIGH,
    label: 'Alto',
  },
  {
    value: PoultryTailEnum.MEDIUM,
    label: 'Médio',
  },
  {
    value: PoultryTailEnum.LOW,
    label: 'Baixo',
  },
];

export const typeListItems = [
  {
    value: PoultryTypeEnum.IndioGigante,
    label: 'Índio gigante',
  },
];

export const favoriteListItems = [
  {
    value: 'true',
    label: 'Ativo'
  }
];

export const MAX_VALUE_PRICE_FILTER = 10000000;
export const MIN_VALUE_PRICE_FILTER = 100;

export type SearchContainerProps = {
  advertisings?: PoultryData[];
  pages?: number;
}

export default function SearchContainer({ advertisings: advertisingsProp = [], pages = 0 }: SearchContainerProps) {
  const advertisings = useSearchAdvertisngs({ initialData: advertisingsProp, initialPages: pages });

  const { push, query } = useRouter();

  const { isAuthenticated } = useAuth();

  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [isOpenSortModal, setIsOpenSortModal] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    sortOptions: [] as string[],
    crestOptions: [] as string[],
    dewlapOptions: [] as string[],
    genderOptions: [] as string[],
    genderCategoryOptions: [] as string[],
    tailOptions: [] as string[],
    typeOptions: [] as string[],
  });
  const [isFavoritesFilterActive, setIsFavoriteFilterActive] = useState(false);
  const [pricesFilter, setPricesFilter] = useState({ min: MIN_VALUE_PRICE_FILTER, max: MAX_VALUE_PRICE_FILTER });

  const toggleFavorite = useToggleFavorite();

  const openFilterModal = useCallback(() => setIsOpenFilterModal(true), []);
  const openSortModal = useCallback(() => setIsOpenSortModal(true), []);

  const closeFilterModal = useCallback(() => setIsOpenFilterModal(false), []);
  const closeSortModal = useCallback(() => setIsOpenSortModal(false), []);

  const handleConfirmFilters = useCallback(() => {
    closeFilterModal();

    push(
      `/search?${new URLSearchParams({
        ...(query as any),
        crest: localFilters.crestOptions.length ? localFilters.crestOptions.join(',') : '' ,
        dewlap: localFilters.dewlapOptions.length ? localFilters.dewlapOptions.join(',') : '',
        genderCategory: localFilters.genderCategoryOptions.length ? localFilters.genderCategoryOptions.join(',') : '',
        gender: localFilters.genderOptions.length ? localFilters.genderOptions.join(',') : '',
        sort: localFilters.sortOptions.length ? localFilters.sortOptions.join(',') : '',
        tail: localFilters.tailOptions.length ? localFilters.tailOptions.join(',') : '',
        type: localFilters.typeOptions.length ? localFilters.typeOptions.join(',') : '',
        favorites: isFavoritesFilterActive.toString(),
        prices: JSON.stringify(pricesFilter)
      }).toString()}`
    );
  }, [push, closeFilterModal, localFilters, isFavoritesFilterActive, pricesFilter]);

  const handleChangeFilter = (filterName: string, filterValue: string, toggleFilter = true) => {
    setLocalFilters((prevLocalFilters) => {
      const prevValue = (prevLocalFilters as any)?.[`${filterName}Options`];

      if (prevValue.some((p: string) => p === filterValue) && toggleFilter) return {
        ...prevLocalFilters,
        [`${filterName}Options`]: prevValue.filter((p: string) => p !== filterValue)
      };

      return {
        ...prevLocalFilters,
        [`${filterName}Options`]: [...prevValue, filterValue],
      };
    });
  };

  const handleSetSortFilter = useCallback(
    (sort: string) => {
      closeSortModal();
      push(`/search?${new URLSearchParams({ ...query, sort }).toString()}`);
      setLocalFilters(prevLocalFilters => ({
        ...prevLocalFilters,
        sortOptions: [sort]
      }));
    },
    [push, query, closeSortModal]
  );

  const handleChangeMinPriceFilter = useCallback((e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g,''));

    setPricesFilter((prevPricesFilter) => ({ ...prevPricesFilter, min: value }));
  }, []);

  const handleChangeMaxPriceFilter = useCallback((e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g,''));

    setPricesFilter((prevPricesFilter) => ({ ...prevPricesFilter, max: value }));
  }, []);
  
  useEffect(() => {
    if (query.sort && query?.sort?.toString().split(',').length !== localFilters.sortOptions.length) {
      query.sort.toString().split(',').forEach((o) => {
        if (!localFilters.sortOptions.includes(o)) {
          handleChangeFilter('sort', o, false);
        }
      });
    }

    if (query.crest && query?.crest?.toString().split(',').length !== localFilters.crestOptions.length) {
      query.crest.toString().split(',').forEach((o) => {
        if (!localFilters.crestOptions.includes(o)) {
          handleChangeFilter('crest', o, false);
        }
      });
    }

    if (query.dewlap && query?.dewlap?.toString().split(',').length !== localFilters.dewlapOptions.length) {
      query.dewlap.toString().split(',').forEach((o) => {
        if (!localFilters.dewlapOptions.includes(o)) {
          handleChangeFilter('dewlap', o, false);
        }
      });
    }

    if (query.gender && query?.gender?.toString().split(',').length !== localFilters.genderOptions.length) {
      query.gender.toString().split(',').forEach((o) => {
        if (!localFilters.genderOptions.includes(o)) {
          handleChangeFilter('gender', o, false);
        }
      });
    }

    if (query.genderCategory && query?.genderCategory?.toString().split(',').length !== localFilters.genderCategoryOptions.length) {
      query.genderCategory.toString().split(',').forEach((o) => {
        if (!localFilters.genderCategoryOptions.includes(o)) {
          handleChangeFilter('genderCategory', o, false);
        }
      });
    }

    if (query.tail && query?.tail?.toString().split(',').length !== localFilters.tailOptions.length) {
      query.tail.toString().split(',').forEach((o) => {
        if (!localFilters.tailOptions.includes(o)) {
          handleChangeFilter('tail', o, false);
        }
      });
    }

    if (query.type && query?.type?.toString().split(',').length !== localFilters.typeOptions.length) {
      query.type.toString().split(',').forEach((o) => {
        if (!localFilters.typeOptions.includes(o)) {
          handleChangeFilter('type', o, false);
        }
      });
    }

    if (query?.favorites === 'true') {
      setIsFavoriteFilterActive(true);
    }

    if (query?.prices) {
      const pricesObjest = JSON.parse(query.prices.toString());

      if (pricesFilter.min !== pricesObjest.min && pricesObjest.max !== pricesFilter.max) {
        setPricesFilter({ min: Number(pricesObjest.min), max: Number(pricesObjest.max) });
      }
    }
  }, [query, pricesFilter]);

  return (
    <StyledContainer>
      <StyledFilters>
        <StyledFilter>
          <SquareButton
            icon={<RiArrowUpDownFill />}
            onClick={openSortModal}
            text="Ordenar"
          />
        </StyledFilter>
        <StyledFilter>
          <SquareButton
            icon={<BiFilterAlt />}
            onClick={openFilterModal}
            text="Filtrar"
          />
        </StyledFilter>
      </StyledFilters>
      <StyledAdvertisings>
        {advertisings?.map((advertising) => (
          <StyledAdvertising key={advertising.id}>
            <AdvertisingItem
              description={advertising.description}
              placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
              onViewAdvertising={() =>
                push(
                  `/breeders/${advertising.breederId}/poultries/${advertising.poultryId}`
                )
              }
              onViewBreeder={() =>
                push(
                  `/breeders/${advertising.breederId}`
                )
              }
              price={advertising.price}
              title={advertising.title}
              image={advertising.image}
              favorited={advertising.favorited}
              breederImage={advertising.breederImage}
              onToggleFavorite={toggleFavorite ? () => toggleFavorite(`${advertising.breederId}/${advertising.poultryId}/${advertising.id}`) : undefined}
            />
          </StyledAdvertising>
        ))}
      </StyledAdvertisings>

      <ConfigModal
        isOpen={isOpenSortModal}
        onClose={closeSortModal}
        title="Ordenação"
      >
        <SelectedList
          onToggle={handleSetSortFilter}
          selecteds={localFilters.sortOptions}
          items={sortListItems}
        />
      </ConfigModal>

      <ConfigModal
        isOpen={isOpenFilterModal}
        onClose={closeFilterModal}
        title="Filtros"
      >
        <StyledFilterModalContainer>
          <StyledFilterModalItem>
            <Expand
              title="Preços"
              expand={query?.prices ? JSON.parse(query.prices.toString()).min !== MIN_VALUE_PRICE_FILTER || JSON.parse(query.prices.toString()).max !== MAX_VALUE_PRICE_FILTER : false}
            >
              <PriceFilterStyle />

              <StyledPriceFilterArea>
                <StyledPrice>
                  <StyledPriceInput
                    value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pricesFilter.min / 100)}
                    onChange={handleChangeMinPriceFilter}
                  />
                </StyledPrice>
                <StyledPrice>
                  <StyledPriceInput
                    textAlign='right'
                    value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pricesFilter.max / 100)}
                    onChange={handleChangeMaxPriceFilter}
                  />
                </StyledPrice>
                <StyledPriceFilter
                  value={[pricesFilter.min, pricesFilter.max]}
                  renderThumb={(props: any) => <StyledPriceDot {...props} />}
                  pearling
                  max={MAX_VALUE_PRICE_FILTER}
                  min={MIN_VALUE_PRICE_FILTER}
                  thumbClassName="slider-thumb"
                  trackClassName="slider-track"
                  onAfterChange={(value: any) => setPricesFilter({ min: value[0], max: value[1] })}
                />
              </StyledPriceFilterArea>
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Crista" expand={Boolean(query?.crest)}>
              <SelectedList
                onToggle={(value) => handleChangeFilter('crest', value)}
                selecteds={localFilters.crestOptions}
                items={crestListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Barbela" expand={Boolean(query?.dewlap)}>
              <SelectedList
                onToggle={(value) => handleChangeFilter('dewlap', value)}
                selecteds={localFilters.dewlapOptions}
                items={dewlapListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Sexo" expand={Boolean(query?.gender)}>
              <SelectedList
                onToggle={(value) => handleChangeFilter('gender', value)}
                selecteds={localFilters.genderOptions}
                items={genderListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Sexagem" expand={Boolean(query?.genderCategory)}>
              <SelectedList
                onToggle={(value) =>
                  handleChangeFilter('genderCategory', value)
                }
                selecteds={localFilters.genderCategoryOptions}
                items={genderCategoryListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Rabo" expand={Boolean(query?.tail)}>
              <SelectedList
                onToggle={(value) => handleChangeFilter('tail', value)}
                selecteds={localFilters.tailOptions}
                items={tailListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Raça" expand={Boolean(query?.type)}>
              <SelectedList
                onToggle={(value) => handleChangeFilter('type', value)}
                selecteds={localFilters.typeOptions}
                items={typeListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          {isAuthenticated && (
            <StyledFilterModalItem>
              <Expand title="Favoritos" expand={Boolean(query?.favorites === 'true')}>
                <SelectedList
                  onToggle={() => setIsFavoriteFilterActive(prevIsFavoriteFilterActive => !prevIsFavoriteFilterActive)}
                  selecteds={[isFavoritesFilterActive.toString()]}
                  items={favoriteListItems}
                />
              </Expand>
            </StyledFilterModalItem>
          )}
        </StyledFilterModalContainer>

        <StyledConfirmButton>
          <Button onClick={handleConfirmFilters}>
            Confirmar
          </Button>
        </StyledConfirmButton>
      </ConfigModal>
    </StyledContainer>
  );
}
