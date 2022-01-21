import type { AppProps } from 'next/app';
import { ReactElement, useCallback, useMemo } from 'react';
import { Container as UiContainer } from '@cig-platform/ui';
import { BiLogIn } from 'react-icons/bi';

import { AppProvider } from '@Contexts/AppContext/AppContext';
import Container from '@Components/Shared/Container/Container';
import '@Configs/i18n';
import useUser from '@Hooks/useUser';
import { useRouter } from 'next/router';

const unauthorizedItems = [
  {
    title: 'Login',
    icon: <BiLogIn />,
    route: '/login'
  },
];

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const user = useUser();

  const router = useRouter();

  const isAuthenticated = Boolean(user.name);

  const items = useMemo(() => isAuthenticated ? [] : unauthorizedItems, [isAuthenticated]);

  const handleMenuItemClick = useCallback((menuItemTitle: string) => {
    const itemRoute = unauthorizedItems.find(i => i.title === menuItemTitle)?.route;

    if (itemRoute) {
      router.push(itemRoute);
    }
  }, [router]);

  return (
    <AppProvider>
      <UiContainer
        items={items}
        onMenuClick={handleMenuItemClick}
        onShortcutClick={() => null}
        shortcuts={[]}
        title='CIG Marketplace'
        user={user}
      >
        <Container>
          <Component {...pageProps} />
        </Container>
      </UiContainer>
    </AppProvider>
  );
}
