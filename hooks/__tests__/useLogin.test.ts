import * as actions from '../../contexts/LoginContext/loginActions';
import { INITIAL_STATE } from '../../contexts/LoginContext/loginReducer';
import { createLoginContextHookRenderer } from '../../utils/tests/loginContextRenderer';
import AuthBffService from '../../services/AuthBffService';

import useLogin from '../useLogin';

describe('useLogin', () => {
  it('has the correct behavior when gets a valid response', async () => {
    const mockStore = {
      ...INITIAL_STATE,
      email: 'email@exemplo.com',
      password: 'password'
    };
    const token = 'token';
    const mockSetIsLoading = jest.fn();
    const mockSetError = jest.fn();
    const mockLogin = jest.fn().mockResolvedValue({ ok: true, token });
    const onSuccess = jest.fn();
    const renderHook = createLoginContextHookRenderer(mockStore);

    jest.spyOn(AuthBffService, 'login').mockImplementation(mockLogin);
    jest.spyOn(actions, 'setIsLoading').mockImplementation(mockSetIsLoading);
    jest.spyOn(actions, 'setError').mockImplementation(mockSetError);

    const { result } = renderHook(() => useLogin({ onSuccess }));

    await (result.current as any)?.(mockStore.email, mockStore.password);

    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
    expect(mockSetError).not.toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalledWith({ email: mockStore.email, password: mockStore.password });
    expect(onSuccess).toHaveBeenCalledWith(token);
  });

  it('has the correct behavior when gets a invalid response', async () => {
    const mockStore = {
      ...INITIAL_STATE,
      email: 'email@exemplo.com',
      password: 'password'
    };
    const error = {};
    const mockSetIsLoading = jest.fn();
    const mockSetError = jest.fn();
    const mockLogin = jest.fn().mockResolvedValue({ ok: false, error });
    const onSuccess = jest.fn();
    const renderHook = createLoginContextHookRenderer(mockStore);

    jest.spyOn(AuthBffService, 'login').mockImplementation(mockLogin);
    jest.spyOn(actions, 'setIsLoading').mockImplementation(mockSetIsLoading);
    jest.spyOn(actions, 'setError').mockImplementation(mockSetError);

    const { result } = renderHook(() => useLogin({ onSuccess }));

    await (result.current as any)?.(mockStore.email, mockStore.password);

    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
    expect(mockSetError).toHaveBeenCalledWith(error);
    expect(mockLogin).toHaveBeenCalledWith({ email: mockStore.email, password: mockStore.password });
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
