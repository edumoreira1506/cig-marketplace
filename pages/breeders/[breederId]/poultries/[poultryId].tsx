import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { BACKOFFICE_URL, POULTRY_PAGE_URL } from '@Constants/urls';
import useAnswerAdvertisingQuestion from '@Hooks/useAnswerAdvertisingQuestion';
import useBreeder from '@Hooks/useBreeder';
import { success } from '@Utils/alert';
import useSaveAdvertisingQuestion from '@Hooks/useSaveAdvertisingQuestion';
import useAuth from '@Hooks/useAuth';
import useSaveDeal from '@Hooks/useSaveDeal';

import { StyledContainer } from './[poultryId].styles';
import { useRefetch } from '@cig-platform/hooks';

const MicroFrontend = dynamic(() => import('@cig-platform/microfrontend-helper'), {
  ssr: false
});

const PoultryPage = () => {
  const router = useRouter();

  const { refetch: refetchMicroFrontEndData, setRefetch: setRefetchMicroFrontEndData } = useRefetch();

  const { t } = useTranslation();

  const { token } = useAuth();

  const breeder = useBreeder();

  const { breederId, poultryId } = router.query;

  const microFrontendParams = useMemo(() => ({
    poultryId: poultryId?.toString() ?? '',
    breederId: breederId?.toString() ?? '',
    refetch: refetchMicroFrontEndData
  }), [breederId, poultryId, refetchMicroFrontEndData]);

  const handleSaveSuccess = useCallback(() => {
    success(t('common.success'), t, () => {
      setRefetchMicroFrontEndData(true);
    });
  }, [t]);

  const handleBuySuccess = useCallback((deal) => {
    window.location.assign(`${BACKOFFICE_URL}compras/${deal.id}`);
  }, []);

  const saveAnswerQuestion = useAnswerAdvertisingQuestion({
    onSuccess: handleSaveSuccess,
    breederId: breederId?.toString() ?? '',
    poultryId: poultryId?.toString() ?? ''
  });

  const saveQuestion = useSaveAdvertisingQuestion({
    onSuccess: handleSaveSuccess,
    poultryId: poultryId?.toString() ?? '',
    breederId: breederId?.toString() ?? '',
  });

  const saveDeal = useSaveDeal({
    onSuccess: handleBuySuccess,
    poultryId: poultryId?.toString() ?? '',
    breederId: breederId?.toString() ?? '',
  });

  const callbacks = useMemo<Record<string, any>>(() => ({
    onAnswer: breeder?.id === breederId && token ? saveAnswerQuestion : undefined,
    onComment: breeder?.id !== breederId && token ? saveQuestion : undefined,
    onBuy: breeder?.id !== breederId && token ? saveDeal : undefined
  }), [breederId, breeder, token, saveAnswerQuestion, saveQuestion, saveDeal]);

  if (!breederId || !poultryId) return null;

  return (
    <StyledContainer id="poultry-container">
      <MicroFrontend
        params={microFrontendParams}
        name="PoultryPage"
        host={POULTRY_PAGE_URL}
        containerId="poultry-container"
        callbacks={callbacks}
      />
    </StyledContainer>
  );
};

export default PoultryPage;
