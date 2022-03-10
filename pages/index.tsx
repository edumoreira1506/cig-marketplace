import React from 'react';

import HomeContainer, { HomeContainerProps } from '@Containers/HomeContainer/HomeContainer';
import MarketplaceBffService from '@Services/MarketplaceBffService';

type HomePageProps = {
  advertisings: HomeContainerProps['advertisings'];
}

const HomePage = ({ advertisings }: HomePageProps) => (
  <HomeContainer advertisings={advertisings} />
);

export async function getStaticProps() {
  const advertisings = await MarketplaceBffService.getHome();

  return {
    props: {
      advertisings
    },
  };
}

export default HomePage;
