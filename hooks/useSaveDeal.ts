import { useCallback } from 'react';

import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from 'services/MarketplaceBffService';

import useAuth from './useAuth';

export default function useSaveDeal({
  poultryId,
  breederId,
  onSuccess,
}: {
  poultryId: string;
  breederId: string;
  onSuccess: () => void;
}) {
  const appDispatch = useAppDispatch();

  const { token } = useAuth();

  const handleSaveDeal = useCallback(async ({
    advertisingId
  }: {
    advertisingId: string;
  }) => {
    try {
      appDispatch(setIsLoading(true));

      await MarketplaceBffService.postDeal(
        breederId,
        poultryId,
        advertisingId,
        token
      );
  
      onSuccess();
    } catch (error) {
      appDispatch(setError(error));
    } finally {
      appDispatch(setIsLoading(false));
    }
  }, [onSuccess, appDispatch, breederId, token, poultryId]);

  return handleSaveDeal;
}
