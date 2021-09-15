import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Tabs, FormField, Button } from '@cig-platform/ui';

import { StyledForm } from './RegisterContainer.styles';

const EMPTY_USER = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  register: '',
  birthDate: '',
};

const EMPTY_POULTRY = {
  name: '',
  description: '',
  address: {
    city: '',
    province: '',
    street: '',
    zipcode: '',
    number: ''
  }
};

export default function RegisterContainer() {
  const [user, setUser] = useState(EMPTY_USER);
  const [poultry, setPoultry] = useState(EMPTY_POULTRY);
  const [tab, setTab] = useState(0);

  const { t } = useTranslation();

  const isValidUser = useMemo(() => Boolean(user.name && user.password && user.confirmPassword && user.email), [
    user.email,
    user.password,
    user.confirmPassword,
    user.name
  ]);

  const handleChangeUserField = useCallback((fieldKey: string, fieldValue: unknown) => setUser(prevUser => ({
    ...prevUser,
    [fieldKey]: fieldValue
  })), []);

  const handleChangePoultryField = useCallback((fieldKey: string, fieldValue: unknown) => setPoultry(prevPoultry => ({
    ...prevPoultry,
    [fieldKey]: fieldValue
  })), []);

  const handleChangeEmailValue = useCallback((newEmail: string | number) => handleChangeUserField('email' , newEmail), []);
  const handleChangePasswordValue = useCallback((newPassword: string | number) => handleChangeUserField('password' , newPassword), []);
  const handleChangeConfirmPasswordValue = useCallback((newConfirmPassword: string | number) => handleChangeUserField('confirmPassword' , newConfirmPassword), []);
  const handleChangeUserName = useCallback((newName: string | number) => handleChangeUserField('name' , newName), []);
  const handleChangeRegister = useCallback((newRegister: string | number) => handleChangeUserField('register', newRegister), []);
  const handleChangeBirthDate = useCallback((newBirthDate: string | number) => handleChangeUserField('birthDate', newBirthDate), []);

  const handleFinishUserForm = useCallback((e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    if (!isValidUser) return;

    e.preventDefault();
    setTab(1);
  }, [isValidUser]);

  return (
    <Tabs tab={tab} setTab={setTab}>
      <StyledForm onSubmit={handleFinishUserForm} title={t('common.user')}>
        <FormField>
          <Input
            label={t('user.fields.name')}
            type="text"
            value={user.name}
            onChange={handleChangeUserName}
            required
            placeholder="João de Sá"
          />
        </FormField>
        <FormField>
          <Input
            label={t('user.fields.email')}
            type="email"
            value={user.email}
            onChange={handleChangeEmailValue}
            required
            placeholder="exemplo@email.com"
          />
        </FormField>
        <FormField>
          <Input
            label={t('user.fields.password')}
            type="password"
            value={user.password}
            onChange={handleChangePasswordValue}
            required
            placeholder="********"
          />
        </FormField>
        <FormField>
          <Input
            label={t('user.fields.confirm-password')}
            type="password"
            value={user.confirmPassword}
            onChange={handleChangeConfirmPasswordValue}
            required
            placeholder="********"
          />
        </FormField>
        <FormField>
          <Input
            label={t('user.fields.register')}
            type="text"
            value={user.register}
            onChange={handleChangeRegister}
            placeholder="977.566.300-84"
          />
        </FormField>
        <FormField>
          <Input
            label={t('user.fields.birth-date')}
            type="date"
            value={user.birthDate}
            onChange={handleChangeBirthDate}
          />
        </FormField>
        <FormField>
          <Button disabled={!isValidUser} type="submit" onClick={handleFinishUserForm} label={t('common.next')} />
        </FormField>
      </StyledForm>
      <div data-active={isValidUser} title={t('common.poultry')}>
        
      </div>
    </Tabs>
  );
}
