import { useMemo } from 'react';
import { useLocalStorage } from '@cig-platform/hooks';

import useUser from './useUser';
import { useRouter } from 'next/router';



export default function useAuth() {
  const router = useRouter();

  const value = router?.query?.['token'];

  const { get } = useLocalStorage('token');

  const user = useUser();

  const { token, isAuthenticated } = useMemo(() => {
    try {
      const localStorageToken = value || get();

      return {
        token: localStorageToken,
        isAuthenticated: Boolean(localStorageToken),
      };
    } catch {
      return {
        token: null,
        isAuthenticated: false,
      };
    }
  }, [get, value]);

  return { token, isAuthenticated, user };
}
