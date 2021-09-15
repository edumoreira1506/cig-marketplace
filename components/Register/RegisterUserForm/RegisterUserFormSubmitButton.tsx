import { useTranslation } from 'react-i18next';
import { Button, FormField } from '@cig-platform/ui';

export interface RegisterUserFormSubmitButtonProps {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

export default function RegisterUserFormSubmitButton({ onSubmit, disabled }: RegisterUserFormSubmitButtonProps) {
  const { t } = useTranslation();

  return (
    <FormField>
      <Button disabled={disabled} type="submit" onClick={onSubmit} label={t('common.next')} />
    </FormField>
  );
}
