import type { AppProps } from 'next/app';
import { ReactElement, useCallback, useMemo } from 'react';
import { Container as UiContainer } from '@cig-platform/ui';
import { BiLogIn } from 'react-icons/bi';
import { GiChicken } from 'react-icons/gi';

import { AppProvider } from '@Contexts/AppContext/AppContext';
import Container from '@Components/Shared/Container/Container';
import '@Configs/i18n';
import useUser from '@Hooks/useUser';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { BACKOFFICE_URL } from '@Constants/urls';

const unauthorizedItems = [
  {
    title: 'Login',
    icon: <BiLogIn />,
    route: '/login'
  },
];

export const authorizedItems = [
  {
    title: 'Home',
    icon: <AiFillHome />,
    route: `${BACKOFFICE_URL}`
  },
  {
    title: 'Meu criatório',
    icon: <AiFillHome />,
    route: `${BACKOFFICE_URL}criatorio`
  },
  {
    title: 'Minhas aves',
    icon: <GiChicken />,
    route:  `${BACKOFFICE_URL}meu-plantel`
  },
];

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const user = useUser();

  const router = useRouter();

  const isAuthenticated = Boolean(user.name);

  const items = useMemo(() => isAuthenticated ? authorizedItems : unauthorizedItems, [isAuthenticated]);

  const handleMenuItemClick = useCallback((menuItemTitle: string) => {
    const itemRoute = [...unauthorizedItems, ...authorizedItems].find(i => i.title === menuItemTitle)?.route;

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
