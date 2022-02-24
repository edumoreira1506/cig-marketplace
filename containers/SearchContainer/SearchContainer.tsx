import React, { useCallback, useState, useMemo } from 'react';
import { AdvertisingItem, ConfigModal, SquareButton, SelectedList } from '@cig-platform/ui';
import { useRouter } from 'next/router';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { BiFilterAlt } from 'react-icons/bi';

import useSearchAdvertisngs from '@Hooks/useSearchAdvertisings';
import { POULTRY_PLACEHOLDER_IMAGE_URL } from '@Constants/urls';

import {
  StyledAdvertising,
  StyledAdvertisings,
  StyledContainer,
  StyledFilter,
  StyledFilters
} from './SearchContainer.styles';

const selectedListItems = [
  {
    label: 'Menor preço',
    value: 'MIN_TO_MAX'
  },
  {
    label: 'Maior preço',
    value: 'MAX_TO_MIN'
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
          items={selectedListItems}
        />
      </ConfigModal>
    </StyledContainer>
  );
}
