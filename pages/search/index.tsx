import React, { VFC } from 'react';

import SearchContainer, { SearchContainerProps } from '@Containers/SearchContainer/SearchContainer';
import ContentSearchService from '@Services/ContentSearchService';

export async function getServerSideProps({ query }: { query: Record<string, string> }) {
  const crest = query?.crest?.toString().split(',') ?? [];
  const dewlap = query?.dewlap?.toString().split(',')  ?? [];
  const gender = query?.gender?.toString().split(',')  ?? [];
  const genderCategory = query?.genderCategory?.toString().split(',')  ?? [];
  const keyword = query?.keyword?.toString();
  const favoriteExternalId = query?.favoriteExternalId?.toString() ?? '';
  const sort = query?.sort?.toString();
  const tail = query?.tail?.toString().split(',') ?? [];
  const type = query?.type?.toString().split(',') ?? [];
  const prices = query?.prices ? JSON.parse(query.prices.toString()) : undefined;

  const { advertisings, pages } = await ContentSearchService.getSearch({
    crest,
    dewlap,
    gender,
    genderCategory,
    keyword,
    sort,
    tail,
    type,
    prices,
    favoriteExternalId,
  });

  return {
    props: {
      advertisings,
      pages
    },
  };
}

const SearchPage: VFC<SearchContainerProps> = ({ advertisings, pages }: SearchContainerProps) => (
  <SearchContainer advertisings={advertisings} pages={pages} />
);


export default SearchPage;
