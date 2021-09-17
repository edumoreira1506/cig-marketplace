import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledContainer, StyledInput, StyledInputWrapper, StyledLabel } from './LoginField.styles';

export interface LoginFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  type: 'email' | 'password';
}

export default function LoginField({ label, value, onChange, type }: LoginFieldProps) {
  const { t } = useTranslation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const placeholder = useMemo(() => type === 'email' ? t('user.fields.email.placeholder'): '********', [type, t]);

  const autoComplete = useMemo(() => type === 'email' ? 'username' : 'current-password', [type]);

  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInputWrapper>
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          type={type}
          autoComplete={autoComplete}
        />
      </StyledInputWrapper>
    </StyledContainer>
  );
}
