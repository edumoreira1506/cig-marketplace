import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Container as UiContainer } from '@cig-platform/ui';
import { useRouter } from 'next/router';
import { BiLogIn } from 'react-icons/bi';
import { AiFillHome, AiOutlinePoweroff } from 'react-icons/ai';
import { GiReceiveMoney } from 'react-icons/gi';
import { UserRegisterTypeEnum } from '@cig-platform/enums';

import { useAppSelector } from '@Contexts/AppContext/AppContext';
import { selectError, selectIsLoading } from '@Contexts/AppContext/appSelectors';
import { error as showError } from '@Utils/alert';
import { BACKOFFICE_URL, LOGO_URL } from '@Constants/urls';
import useUser from '@Hooks/useUser';

const unauthorizedItems = [
  {
    title: 'Login',
    icon: <BiLogIn />,
    route: '/login'
  },
];

export const authorizedItems = [
  {
    title: 'Meu plantel',
    icon: <AiFillHome />,
    route: `${BACKOFFICE_URL}`
  },
  {
    title: 'Meu criatório',
    icon: <AiFillHome />,
    route: `${BACKOFFICE_URL}criatorio`
  },
  {
    title: 'Vendas',
    icon: <GiReceiveMoney />,
    route: `${BACKOFFICE_URL}vendas`
  },
  {
    title: 'Compras',
    icon: <GiReceiveMoney />,
    route: `${BACKOFFICE_URL}compras`
  },
  {
    title: 'Sair',
    icon: <AiOutlinePoweroff />,
    route: `${BACKOFFICE_URL}logout`
  }
];

enum Shortcuts {
  LOGOUT = 'Sair',
  EDIT_PASSWORD = 'Editar senha'
}

const shortcutLinks = {
  [Shortcuts.LOGOUT]: `${BACKOFFICE_URL}logout`,
  [Shortcuts.EDIT_PASSWORD]: `${BACKOFFICE_URL}editar-senha`,
};

export interface ContainerProps {
  children: ReactNode | ReactNode[]
}

export default function Container({ children }: ContainerProps) {
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);

  const { query, push } = useRouter();

  const user = useUser();

  const logout = useMemo(() => query?.logout === 'true', [query?.logout]);

  const { t } = useTranslation();

  const isAuthenticated = Boolean(user.name);

  const items = useMemo(() => isAuthenticated ? authorizedItems : unauthorizedItems, [isAuthenticated]);

  const shurtcutItems = useMemo(() => {
    if (!isAuthenticated) return [];
    if (user?.registerType !== UserRegisterTypeEnum.Default) return [Shortcuts.LOGOUT];
    return [Shortcuts.EDIT_PASSWORD, Shortcuts.LOGOUT];
  }, [isAuthenticated, user?.registerType]);

  const handleMenuItemClick = useCallback((menuItemTitle: string) => {
    const itemRoute = [...unauthorizedItems, ...authorizedItems].find(i => i.title === menuItemTitle)?.route;

    if (itemRoute) {
      push(itemRoute);
    }
  }, [push]);

  const handleShortcutClick = useCallback((shortcut: string) => {
    push(shortcutLinks[shortcut as Shortcuts]);
  }, [push]);

  const handleSearch = useCallback((keyword: string) => {
    push(`/search?${new URLSearchParams({ ...query, keyword }).toString()}`);
  }, [push, query]);

  const handleNavigateToMainPage = useCallback(() => push('/'), [push]);

  useEffect(() => {
    if (error) {
      showError(error?.message ?? t('common.something-wrong'), t);
    }
  }, [error, t]);

  useEffect(() => {
    if (logout) {
      window.localStorage.clear();
      window.location.assign('login');
    }
  }, [logout, push]);

  return (
    <UiContainer
      items={items}
      onMenuClick={handleMenuItemClick}
      onShortcutClick={handleShortcutClick}
      shortcuts={shurtcutItems}
      title='CIG Marketplace'
      user={user}
      logoUrl={LOGO_URL}
      isLoading={isLoading}
      onSearch={handleSearch}
      onClickTitle={handleNavigateToMainPage}
    >
      {children}
    </UiContainer>
  );
}
