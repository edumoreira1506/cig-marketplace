import { ApiErrorType } from '@cig-platform/types';

export const DEFAULT_STATE = {
  isLoading: false,
  error: null,
};

export interface DefaultState {
  isLoading: boolean;
  error: null | ApiErrorType;
}
