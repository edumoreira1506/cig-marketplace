import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineUser, AiFillLock } from 'react-icons/ai';

import { StyledContainer, StyledInput, StyledInputWrapper, StyledLabel, StyledIcon } from './LoginField.styles';

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

  const { placeholder, autoComplete, icon: Icon } = useMemo(() => type === 'email'
    ? ({
      placeholder: t('user.fields.email.placeholder'),
      autoComplete: 'username',
      icon: AiOutlineUser
    })
    : ({
      placeholder: '********',
      autoComplete: 'current-password',
      icon: AiFillLock
    }), [type, t]);

  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInputWrapper>
        <StyledIcon>
          <Icon />
        </StyledIcon>
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          type={type}
          autoComplete={autoComplete}
          name={type === 'password' ? 'password' : 'email'}
        />
      </StyledInputWrapper>
    </StyledContainer>
  );
}
