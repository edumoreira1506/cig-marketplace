import * as actions from '../../contexts/RegisterContext/registerActions';
import { INITIAL_STATE } from '../../contexts/RegisterContext/registerReducer';
import { createRegisterContextHookRenderer } from '../../utils/tests/registerContextRenderer';
import AuthBffService from '../../services/AuthBffService';

import useSubmitRegister from '../useSubmitRegister';

describe('useSubmitRegister', () => {
  it('has the correct behavior when gets a valid response', async () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {},
      breeder: {}
    };
    const mockSetIsLoading = jest.fn();
    const mockSetError = jest.fn();
    const mockRegisterUser = jest.fn().mockResolvedValue({ ok: true });
    const onSuccess = jest.fn();
    const renderHook = createRegisterContextHookRenderer(mockStore);

    jest.spyOn(AuthBffService, 'registerUser').mockImplementation(mockRegisterUser);
    jest.spyOn(actions, 'setIsLoading').mockImplementation(mockSetIsLoading);
    jest.spyOn(actions, 'setError').mockImplementation(mockSetError);

    const { result } = renderHook(() => useSubmitRegister({ onSuccess }));

    await (result.current as any)?.({ user: mockStore.user, breeder: mockStore.breeder });

    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
    expect(mockSetError).not.toHaveBeenCalled();
    expect(mockRegisterUser).toHaveBeenCalledWith({ user: mockStore.user, breeder: mockStore.breeder });
    expect(onSuccess).toHaveBeenCalled();
  });

  it('has the correct behavior when gets a invalid response', async () => {
    const mockStore = {
      ...INITIAL_STATE,
      user: {},
      breeder: {}
    };
    const error = {};
    const mockSetIsLoading = jest.fn();
    const mockSetError = jest.fn();
    const mockRegisterUser = jest.fn().mockResolvedValue({ ok: false, error });
    const onSuccess = jest.fn();
    const renderHook = createRegisterContextHookRenderer(mockStore);

    jest.spyOn(AuthBffService, 'registerUser').mockImplementation(mockRegisterUser);
    jest.spyOn(actions, 'setIsLoading').mockImplementation(mockSetIsLoading);
    jest.spyOn(actions, 'setError').mockImplementation(mockSetError);

    const { result } = renderHook(() => useSubmitRegister({ onSuccess }));

    await (result.current as any)?.({ user: mockStore.user, breeder: mockStore.breeder });

    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
    expect(mockSetError).toHaveBeenCalledWith(error);
    expect(mockRegisterUser).toHaveBeenCalledWith({ user: mockStore.user, breeder: mockStore.breeder });
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
