import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@cig-platform/data-helper';

import { AppProvider } from '@Contexts/AppContext/AppContext';
import Container from '@Components/Shared/Container/Container';
import '@Configs/i18n';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </AppProvider>
    </QueryClientProvider>
  );
}
