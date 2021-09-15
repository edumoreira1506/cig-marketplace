import { useCallback, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTranslation } from 'react-i18next';
import { Subtitle } from '@cig-platform/ui';

import RegisterContext from '@Contexts/RegisterContext/RegisterContext';
import { selectPoultry, selectUser } from '@Contexts/RegisterContext/registerSelectors';
import { RegisterState } from '@Contexts/RegisterContext/registerReducer';

import RegisterPoultryFormName from './RegisterPoultryFormName';
import RegisterPoultryFormDescription from './RegisterPoultryFormDescription';
import RegisterPoultryFormAddressCity from './RegisterPoultryFormAddressCity';
import RegisterPoultryFormAddressProvince from './RegisterPoultryFormAddressProvince';
import RegisterPoultryFormAddressStreet from './RegisterPoultryFormAddressStreet';
import RegisterPoultryFormAddressZipcode from './RegisterPoultryFormAddressZipcode';
import RegisterPoultryFormSubmitButton from './RegisterPoultryFormSubmitButton';

export interface RegisterPoultryFormProps {
  onSubmit: ({ user, poultry }: { user: RegisterState['user']; poultry: RegisterState['poultry'] }) => void;
  title: string;
}

export default function RegisterPoultryForm({ onSubmit, title }: RegisterPoultryFormProps) {
  const poultry = useContextSelector(RegisterContext, selectPoultry);
  const user = useContextSelector(RegisterContext, selectUser);

  const { t } = useTranslation();
  
  const isValidPoultry = useMemo(() => Boolean(poultry.name), [poultry.name]);

  const handleSubmitPoultryForm = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidPoultry) return;

    onSubmit({ user, poultry });
  }, [isValidPoultry, user, poultry]);

  return (
    <form onSubmit={handleSubmitPoultryForm} title={title}>
      <RegisterPoultryFormName />
      <RegisterPoultryFormDescription />
      <Subtitle text={t('poultry.fields.address')} />
      <RegisterPoultryFormAddressCity />
      <RegisterPoultryFormAddressProvince />
      <RegisterPoultryFormAddressStreet />
      <RegisterPoultryFormAddressZipcode />
      <RegisterPoultryFormSubmitButton disabled={!isValidPoultry} onSubmit={handleSubmitPoultryForm} />
    </form>
  );
}
