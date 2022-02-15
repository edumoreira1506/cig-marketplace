import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IDeal } from '@cig-platform/types';

import { useAppDispatch } from '@Contexts/AppContext/AppContext';
import { setError, setIsLoading } from '@Contexts/AppContext/appActions';
import MarketplaceBffService from '@Services/MarketplaceBffService';
import { withInput } from '@Utils/alert';

import useAuth from './useAuth';

export default function useSaveDeal({
  poultryId,
  breederId,
  onSuccess,
}: {
  poultryId: string;
  breederId: string;
  onSuccess: (deal: IDeal) => void;
}) {
  const appDispatch = useAppDispatch();

  const { token } = useAuth();

  const { t } = useTranslation();

  const handleOnChangeInputAlert = useCallback(() => {
    const inputElement = document.querySelector('.swal2-input') as HTMLInputElement;

    if (!inputElement) return;

    const typed = inputElement.value;
    const numbers = typed.replace(/[^0-9]/g,'');

    if (typed.includes('R')) {
      inputElement.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(numbers) / 100);
    } else {
      inputElement.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(numbers));
    }
  }, []);

  const handleSaveDeal = useCallback(async ({
    advertisingId
  }: {
    advertisingId: string;
  }) => {
    withInput(
      t('confirm-deal-value'),
      async (rawValue) => {
        const value = Number(rawValue.replace(/[^0-9]/g,''));

        document.querySelector('.swal2-input')?.removeEventListener('keyup', handleOnChangeInputAlert);

        withInput(
          t('confirm-deal-description'),
          async (description = '') => {
            try {
              appDispatch(setIsLoading(true));

              const deal = await MarketplaceBffService.postDeal(
                breederId,
                poultryId,
                advertisingId,
                token,
                { value, description }
              );

              onSuccess(deal);
            } catch (error) {
              appDispatch(setError(error));
            } finally {
              appDispatch(setIsLoading(false));
            }
          },
          t
        );
      },
      t
    );

    document.querySelector('.swal2-input')?.addEventListener('keyup', handleOnChangeInputAlert);
  }, [onSuccess, appDispatch, breederId, token, poultryId, t]);

  return handleSaveDeal;
}
