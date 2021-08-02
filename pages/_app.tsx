import type { AppProps } from 'next/app';
import { ReactElement } from 'react';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}
