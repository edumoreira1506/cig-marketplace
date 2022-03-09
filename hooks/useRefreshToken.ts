import { useCallback } from 'react';
import jwt from 'jsonwebtoken';
import { useLocalStorage } from '@cig-platform/hooks';

import AuthBffService from '@Services/AuthBffService';
import { IDecodedToken } from '@Hooks/useUser';
import { useAppDispatch, useAppSelector } from '@Contexts/AppContext/AppContext';
import { selectFavorites } from '@Contexts/AppContext/appSelectors';
import { setError, setFavorites, setIsLoading } from '@Contexts/AppContext/appActions';

export default function useRefreshToken(token: string) {
  const { set } = useLocalStorage('token');

  const favorites = useAppSelector(selectFavorites);

  const dispatch = useAppDispatch();

  const refreshToken = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));

      const newToken = await AuthBffService.refreshToken(token);

      if (newToken?.ok) {
        const decodedToken = jwt.decode((newToken as any).token) as IDecodedToken;

        if (decodedToken.favorites.length !== favorites.length) dispatch(setFavorites(decodedToken.favorites));

        set((newToken as any).token);
      }
    } catch (error) {
      dispatch(setError(error));

      console.error('Error refreshing token');
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [token, set, favorites, dispatch]);

  return refreshToken;
}
