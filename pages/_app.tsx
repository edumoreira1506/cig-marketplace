import type { AppProps } from 'next/app';
import { ReactElement } from 'react';

import { AppProvider } from '@Contexts/AppContext/AppContext';

import '@Styles/globals.css';
import '@Configs/i18n';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AppProvider>
      <Component {...pageProps} />;
    </AppProvider>
  );
}
