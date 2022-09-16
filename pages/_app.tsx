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
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <meta name="application-name" content="CIG Marketplace" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CIG Marketplace" />
        <meta name="description" content="" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#2a3c5a" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2a3c5a" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="CIG Marketplace" />
        <meta name="twitter:description" content="" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="CIG Marketplace" />
        <meta property="og:site_name" content="CIG Marketplace" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Container>
            <Component {...pageProps} />
          </Container>
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}
