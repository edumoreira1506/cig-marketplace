import { useTranslation } from 'react-i18next';
import { Button, FormField } from '@cig-platform/ui';

export interface RegisterPoultryFormSubmitButtonProps {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

export default function RegisterPoultryFormSubmitButton({ onSubmit, disabled }: RegisterPoultryFormSubmitButtonProps) {
  const { t } = useTranslation();

  return (
    <FormField>
      <Button disabled={disabled} type="submit" onClick={onSubmit} label={t('common.register')} />
    </FormField>
  );
}
