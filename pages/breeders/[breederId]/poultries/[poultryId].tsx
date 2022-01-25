import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { POULTRY_PAGE_URL } from '@Constants/urls';
import useAnswerAdvertisingQuestion from '@Hooks/useAnswerAdvertisingQuestion';
import useBreeder from '@Hooks/useBreeder';
import { success } from '@Utils/alert';

import { StyledContainer } from './[poultryId].styles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import useSaveAdvertisingQuestion from '@Hooks/useSaveAdvertisingQuestion';
import useAuth from '@Hooks/useAuth';

const MicroFrontend = dynamic(() => import('@cig-platform/microfrontend-helper'), {
  ssr: false
});

const PoultryPage = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { token } = useAuth();

  const breeder = useBreeder();

  const { breederId, poultryId } = router.query;

  const microFrontendParams = useMemo(() => ({
    poultryId: poultryId?.toString() ?? '',
    breederId: breederId?.toString() ?? '',
  }), [breederId, poultryId]);

  const handleSaveSuccess = useCallback(() => {
    success(t('action-success'), t, () => window.location.reload());
  }, [t]);

  const saveAnswerQuestion = useAnswerAdvertisingQuestion({
    onSuccess: handleSaveSuccess,
    poultryId: poultryId?.toString() ?? ''
  });

  const saveQuestion = useSaveAdvertisingQuestion({
    onSuccess: handleSaveSuccess,
    poultryId: poultryId?.toString() ?? ''
  });

  const callbacks = useMemo<Record<string, any>>(() => ({
    onAnswer: breeder?.id === breederId && token ? saveAnswerQuestion : undefined,
    onComment: breeder?.id !== breederId && token ? saveQuestion : undefined
  }), [breederId, breeder, token, saveAnswerQuestion, saveQuestion]);

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
