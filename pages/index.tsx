import React from 'react';

import HomeContainer, { HomeContainerProps } from '@Containers/HomeContainer/HomeContainer';
import ContentSearchService from '@Services/ContentSearchService';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-gallery/styles/css/image-gallery.css';

type HomePageProps = {
  advertisings: HomeContainerProps['advertisings'];
}

const HomePage = ({ advertisings }: HomePageProps) => (
  <HomeContainer advertisings={advertisings} />
);

export async function getServerSideProps() {
  const advertisings = await ContentSearchService.getHome();

  return {
    props: {
      advertisings
    },
  };
}

export default HomePage;
