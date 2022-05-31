import React from 'react';

import HomeContainer, { HomeContainerProps } from '@Containers/HomeContainer/HomeContainer';
import ContentSearchService from '@Services/ContentSearchService';

type HomePageProps = {
  carousels: HomeContainerProps['carousels'];
}

const HomePage = ({ carousels }: HomePageProps) => (
  <HomeContainer carousels={carousels} />
);

export async function getServerSideProps() {
  const homeResponse = await ContentSearchService.getHome();

  return {
    props: {
      carousels: homeResponse?.carousels
    },
  };
}

export default HomePage;
