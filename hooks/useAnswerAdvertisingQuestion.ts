import { useCallback } from 'react';

import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from 'services/MarketplaceBffService';

import useAuth from './useAuth';
import useBreeder from './useBreeder';

export default function useAnswerAdvertisingQuestion({
  poultryId,
  onSuccess,
}: {
  poultryId: string;
  onSuccess: () => void;
}) {
  const appDispatch = useAppDispatch();

  const { token } = useAuth();

  const breeder = useBreeder();

  const handleAnswerAdvertisingQuestion = useCallback(async ({
    comment,
    commentId,
    advertisingId
  }: {
    commentId: string;
    comment: string;
    advertisingId: string;
  }) => {
    if (!breeder) return;

    try {
      appDispatch(setIsLoading(true));

      await MarketplaceBffService.postAdvertisingQuestionAnswer(
        breeder.id,
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
  }, [onSuccess, appDispatch, breeder, token, poultryId]);

  return handleAnswerAdvertisingQuestion;
}
