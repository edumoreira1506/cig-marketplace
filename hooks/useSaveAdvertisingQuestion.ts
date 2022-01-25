import { useCallback } from 'react';

import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from 'services/MarketplaceBffService';

import useAuth from './useAuth';

export default function useSaveAdvertisingQuestion({
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

  const handleAnswerAdvertisingQuestion = useCallback(async ({
    comment,
    advertisingId
  }: {
    advertisingId: string;
    comment: string;
  }) => {
    try {
      appDispatch(setIsLoading(true));

      await MarketplaceBffService.postAdvertisingQuestion(
        breederId,
        poultryId,
        advertisingId,
        token,
        { content: comment }
      );
  
      onSuccess();
    } catch (error) {
      appDispatch(setError(error));
    } finally {
      appDispatch(setIsLoading(false));
    }
  }, [onSuccess, appDispatch, breederId, token, poultryId]);

  return handleAnswerAdvertisingQuestion;
}
