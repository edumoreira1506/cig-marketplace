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

import useSearchAdvertisngs from '@Hooks/useSearchAdvertisings';
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
  StyledConfirmButton
} from './SearchContainer.styles';

const sortListItems = [
  {
    label: 'Menor preço',
    value: 'MIN_TO_MAX',
  },
  {
    label: 'Maior preço',
    value: 'MAX_TO_MIN',
  },
];

const crestListItems = [
  {
    value: PoultryCrestEnum.Ball,
    label: 'Bola',
  },
  {
    value: PoultryCrestEnum.Pea,
    label: 'Ervilha',
  },
];

const dewlapListItems = [
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

const genderListItems = [
  {
    value: PoultryGenderEnum.Female,
    label: 'Fêmea',
  },
  {
    value: PoultryGenderEnum.Male,
    label: 'Macho',
  },
];

const genderCategoryListItems = [
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

const tailListItems = [
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

const typeListItems = [
  {
    value: PoultryTypeEnum.IndioGigante,
    label: 'Índio gigante',
  },
];

export default function SearchContainer() {
  const advertisings = useSearchAdvertisngs();

  const { push, query } = useRouter();

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
        crest: localFilters.crestOptions.length ? localFilters.crestOptions[0] : '' ,
        dewlap: localFilters.dewlapOptions.length ? localFilters.dewlapOptions[0] : '',
        genderCategory: localFilters.genderCategoryOptions.length ? localFilters.genderCategoryOptions[0] : '',
        gender: localFilters.genderOptions.length ? localFilters.genderOptions[0] : '',
        sort: localFilters.sortOptions.length ? localFilters.sortOptions[0] : '',
        tail: localFilters.tailOptions.length ? localFilters.tailOptions[0] : '',
        type: localFilters.typeOptions.length ? localFilters.typeOptions[0] : '',
      }).toString()}`
    );
  }, [push, closeFilterModal, localFilters]);

  const handleChangeFilter = (filterName: string, filterValue: string, toggleFilter = true) => {
    setLocalFilters((prevLocalFilters) => {
      const prevValue = (prevLocalFilters as any)?.[`${filterName}Options`];

      if (prevValue?.[0] === filterValue && toggleFilter) return {
        ...prevLocalFilters,
        [`${filterName}Options`]: []
      };

      return {
        ...prevLocalFilters,
        [`${filterName}Options`]: [filterValue],
      };
    });
  };

  const handleSetSortFilter = useCallback(
    (sort: string) => {
      closeSortModal();
      push(`/search?${new URLSearchParams({ ...query, sort }).toString()}`);
    },
    [push, query, closeSortModal]
  );
  
  useEffect(() => {
    if (query?.sort) {
      handleChangeFilter('sort', query.sort.toString(), false);
    }

    if (query?.crest) {
      handleChangeFilter('crest', query.crest.toString(), false);
    }

    if (query?.dewlap) {
      handleChangeFilter('dewlap', query.dewlap.toString(), false);
    }

    if (query?.gender) {
      handleChangeFilter('gender', query.gender.toString(), false);
    }

    if (query?.genderCategory) {
      handleChangeFilter('genderCategory', query.genderCategory.toString(), false);
    }

    if (query?.tail) {
      handleChangeFilter('tail', query.tail.toString(), false);
    }

    if (query?.type) {
      handleChangeFilter('type', query.type.toString(), false);
    }
  }, [query]);

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
              price={advertising.price}
              title={advertising.title}
              image={advertising.image}
              favorited={advertising.favorited}
              onToggleFavorite={() => toggleFavorite ? toggleFavorite(`${advertising.breederId}/${advertising.poultryId}/${advertising.id}`) : undefined}
            />
          </StyledAdvertising>
        ))}
      </StyledAdvertisings>

      <ConfigModal
        isOpen={isOpenSortModal}
        onClose={closeSortModal}
        title="Ordenar"
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
        title="Filtrar"
      >
        <StyledFilterModalContainer>
          <StyledFilterModalItem>
            <Expand title="Crista">
              <SelectedList
                onToggle={(value) => handleChangeFilter('crest', value)}
                selecteds={localFilters.crestOptions}
                items={crestListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Barbela">
              <SelectedList
                onToggle={(value) => handleChangeFilter('dewlap', value)}
                selecteds={localFilters.dewlapOptions}
                items={dewlapListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Sexo">
              <SelectedList
                onToggle={(value) => handleChangeFilter('gender', value)}
                selecteds={localFilters.genderOptions}
                items={genderListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Sexagem">
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
            <Expand title="Rabo">
              <SelectedList
                onToggle={(value) => handleChangeFilter('tail', value)}
                selecteds={localFilters.tailOptions}
                items={tailListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title="Raça">
              <SelectedList
                onToggle={(value) => handleChangeFilter('type', value)}
                selecteds={localFilters.typeOptions}
                items={typeListItems}
              />
            </Expand>
          </StyledFilterModalItem>
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
