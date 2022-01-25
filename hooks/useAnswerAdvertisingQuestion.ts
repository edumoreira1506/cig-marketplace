import { useCallback } from 'react';

import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from 'services/MarketplaceBffService';

import useAuth from './useAuth';

export default function useAnswerAdvertisingQuestion({
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
    commentId,
    advertisingId
  }: {
    commentId: string;
    comment: string;
    advertisingId: string;
  }) => {
    try {
      appDispatch(setIsLoading(true));

      await MarketplaceBffService.postAdvertisingQuestionAnswer(
        breederId,
        poultryId,
        advertisingId,
        commentId,
        token,
        { content: comment }
      );
  
      onSuccess();
    } catch (error) {
      appDispatch(setError(error));
    } finally {
      appDispatch(setIsLoading(false));
    }
  }, [onSuccess, appDispatch, token, poultryId]);

  return handleAnswerAdvertisingQuestion;
}
