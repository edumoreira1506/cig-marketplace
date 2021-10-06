import { renderHook } from '@testing-library/react-hooks';

import AuthBffService from '../../services/AuthBffService';
import * as Alert from '../../utils/alert';
import * as actions from '../../contexts/AppContext/appActions';
import useRecoverPassword from '../useRecoverPassword';

describe('useRecoverPassword', () => {
  it('calls onSuccess', async () => {
    const onSuccess = jest.fn();
    const mockRecoverPassword = jest.fn().mockResolvedValue({ ok: true });
    const email = 'email';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockWithInput = (_: any, callback: any, __: any) => callback(email);

    jest.spyOn(AuthBffService, 'recoverPassword').mockImplementation(mockRecoverPassword);
    jest.spyOn(Alert, 'withInput').mockImplementation(mockWithInput);

    const { result } = renderHook(() => useRecoverPassword({ onSuccess }));

    await (result.current as any)?.();

    expect(mockRecoverPassword).toHaveBeenCalledWith(email);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('dispatch error', async () => {
    const onSuccess = jest.fn();
    const error = {};
    const mockSetError = jest.fn();
    const mockRecoverPassword = jest.fn().mockResolvedValue({ ok: false, error });
    const email = 'email';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockWithInput = (_: any, callback: any, __: any) => callback(email);

    jest.spyOn(AuthBffService, 'recoverPassword').mockImplementation(mockRecoverPassword);
    jest.spyOn(Alert, 'withInput').mockImplementation(mockWithInput);
    jest.spyOn(actions, 'setError').mockImplementation(mockSetError);

    const { result } = renderHook(() => useRecoverPassword({ onSuccess }));

    await (result.current as any)?.();

    expect(mockRecoverPassword).toHaveBeenCalledWith(email);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(mockSetError).toHaveBeenCalledWith(error);
  });
});
