import React, { useCallback, useState, useMemo } from 'react';
import {
  AdvertisingItem,
  ConfigModal,
  SquareButton,
  SelectedList,
  Expand
} from '@cig-platform/ui';
import { useRouter } from 'next/router';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { BiFilterAlt } from 'react-icons/bi';
import { PoultryCrestEnum, PoultryDewlapEnum, PoultryGenderCategoryEnum, PoultryGenderEnum, PoultryTailEnum, PoultryTypeEnum } from '@cig-platform/enums';

import useSearchAdvertisngs from '@Hooks/useSearchAdvertisings';
import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';

import {
  StyledAdvertising,
  StyledAdvertisings,
  StyledContainer,
  StyledFilter,
  StyledFilters,
  StyledFilterModalContainer,
  StyledFilterModalItem,
} from './SearchContainer.styles';

const sortListItems = [
  {
    label: 'Menor preço',
    value: 'MIN_TO_MAX'
  },
  {
    label: 'Maior preço',
    value: 'MAX_TO_MIN'
  }
];

const crestListItems = [
  {
    value: PoultryCrestEnum.Ball,
    label: 'Bola'
  },
  {
    value: PoultryCrestEnum.Pea,
    label: 'Ervilha'
  }
];

const dewlapListItems = [
  {
    value: PoultryDewlapEnum.DOUBLE,
    label: 'Dupla'
  },
  {
    value: PoultryDewlapEnum.EMPTY,
    label: 'Ausência total'
  },
  {
    value: PoultryDewlapEnum.SINGLE,
    label: 'Única'
  }
];

const genderListItems = [
  {
    value: PoultryGenderEnum.Female,
    label: 'Fêmea'
  },
  {
    value: PoultryGenderEnum.Male,
    label: 'Macho'
  }
];

const genderCategoryListItems = [
  {
    value: PoultryGenderCategoryEnum.FemaleChicken,
    label: 'Franga'
  },
  {
    value: PoultryGenderCategoryEnum.MaleChicken,
    label: 'Frango'
  },
  {
    value: PoultryGenderCategoryEnum.Matrix,
    label: 'Matriz'
  },
  {
    value: PoultryGenderCategoryEnum.Reproductive,
    label: 'Reprodutor'
  },
];

const tailListItems = [
  {
    value: PoultryTailEnum.HIGH,
    label: 'Alto'
  },
  {
    value: PoultryTailEnum.MEDIUM,
    label: 'Médio'
  },
  {
    value: PoultryTailEnum.LOW,
    label: 'Baixo'
  }
];

const typeListItems = [
  {
    value: PoultryTypeEnum.IndioGigante,
    label: 'Índio gigante'
  }
];

export default function SearchContainer() {
  const advertisings = useSearchAdvertisngs();

  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [isOpenSortModal, setIsOpenSortModal] = useState(false);

  const openFilterModal = useCallback(() => setIsOpenFilterModal(true), []);
  const openSortModal = useCallback(() => setIsOpenSortModal(true), []);

  const closeFilterModal = useCallback(() => setIsOpenFilterModal(false), []);
  const closeSortModal = useCallback(() => setIsOpenSortModal(false), []);

  const { push, query } = useRouter();

  const selectedSortOptions = useMemo(() => [query?.sort?.toString()].filter(Boolean) as string[], [query?.sort]);
  const selectedCrestOptions = useMemo(() => [query?.crest?.toString()].filter(Boolean) as string[], [query?.crest]);
  const selectedDewlapOptions = useMemo(() => [query?.dewlap?.toString()].filter(Boolean) as string[], [query?.dewlap]);
  const selectedGenderOptions = useMemo(() => [query?.gender?.toString()].filter(Boolean) as string[], [query?.gender]);
  const selectedGenderCategoryOptions = useMemo(() => [query?.genderCategory?.toString()].filter(Boolean) as string[], [query?.genderCategory]);
  const selectedTailOptions = useMemo(() => [query?.tail?.toString()].filter(Boolean) as string[], [query?.tail]);
  const selectedTypeOptions = useMemo(() => [query?.type?.toString()].filter(Boolean) as string[], [query?.type]);

  const handleSetFilter = (queryName: string, queryValue: string) => {
    push(`/search?${new URLSearchParams({ ...(query as any), [queryName]: queryValue }).toString()}`);
  };

  const handleSetSortFilter = useCallback((sort: string) => {
    closeSortModal();
    push(`/search?${new URLSearchParams({ ...query, sort }).toString()}`);
  }, [push, query, closeSortModal]);

  return (
    <StyledContainer>
      <StyledFilters>
        <StyledFilter>
          <SquareButton icon={<RiArrowUpDownFill />} onClick={openSortModal} text="Ordenar"  />
        </StyledFilter>
        <StyledFilter>
          <SquareButton icon={<BiFilterAlt />} onClick={openFilterModal} text="Filtrar"  />
        </StyledFilter>
      </StyledFilters>
      <StyledAdvertisings>
        {advertisings?.map(advertising => (
          <StyledAdvertising key={advertising.id}>
            <AdvertisingItem
              description={advertising.description}
              placeholderImage={POULTRY_PLACEHOLDER_IMAGE_URL}
              onViewAdvertising={() => push(`/breeders/${advertising.breederId}/poultries/${advertising.poultryId}`)}
              price={advertising.price}
              title={advertising.title}
              image={advertising.image}
            />
          </StyledAdvertising>
        ))}        
      </StyledAdvertisings>

      <ConfigModal isOpen={isOpenSortModal} onClose={closeSortModal} title='Ordenar'>
        <SelectedList
          onToggle={handleSetSortFilter}
          selecteds={selectedSortOptions}
          items={sortListItems}
        />
      </ConfigModal>

      <ConfigModal isOpen={isOpenFilterModal} onClose={closeFilterModal} title="Filtrar">
        <StyledFilterModalContainer>
          <StyledFilterModalItem>
            <Expand title='Crista'>
              <SelectedList
                onToggle={(value) => handleSetFilter('crest', value)}
                selecteds={selectedCrestOptions}
                items={crestListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title='Barbela'>
              <SelectedList
                onToggle={(value) => handleSetFilter('dewlap', value)}
                selecteds={selectedDewlapOptions}
                items={dewlapListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title='Sexo'>
              <SelectedList
                onToggle={(value) => handleSetFilter('gender', value)}
                selecteds={selectedGenderOptions}
                items={genderListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title='Sexagem'>
              <SelectedList
                onToggle={(value) => handleSetFilter('genderCategory', value)}
                selecteds={selectedGenderCategoryOptions}
                items={genderCategoryListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title='Rabo'>
              <SelectedList
                onToggle={(value) => handleSetFilter('tail', value)}
                selecteds={selectedTailOptions}
                items={tailListItems}
              />
            </Expand>
          </StyledFilterModalItem>

          <StyledFilterModalItem>
            <Expand title='Raça'>
              <SelectedList
                onToggle={(value) => handleSetFilter('type', value)}
                selecteds={selectedTypeOptions}
                items={typeListItems}
              />
            </Expand>
          </StyledFilterModalItem>
        </StyledFilterModalContainer>
      </ConfigModal>
    </StyledContainer>
  );
}
