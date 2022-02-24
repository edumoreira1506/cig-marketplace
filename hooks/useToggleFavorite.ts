import { useCallback } from 'react';

import useUser from '@Hooks/useUser';
import useAuth from '@Hooks/useAuth';
import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from '@Services/MarketplaceBffService';

export default function useToggleFavorite() {
  const { favorites } = useUser();

  const { isAuthenticated, token } = useAuth();

  const dispatch = useAppDispatch();
  console.log({ favorites });
  const handleToggleFavorite = useCallback(async (identifier: string) => {
    const [breederId, poultryId, advertisingId] = identifier.split('/');

    try {
      dispatch(setIsLoading(true));

      const favorite = favorites.find(f => f.advertisingId === advertisingId);

      if (favorite) {
        await MarketplaceBffService.removeFavorite({
          breederId,
          poultryId,
          advertisingId,
          token,
          favoriteId: favorite.id
        });
      } else {
        await MarketplaceBffService.postFavorite({
          breederId,
          poultryId,
          advertisingId,
          token
        });
      }
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [favorites, dispatch]);

  if (!isAuthenticated) return undefined;

  return handleToggleFavorite;
}
