import { createReducableContext } from '@Utils/context';

import { INITIAL_STATE, RegisterState, RegisterActionTypes } from './registerReducer';

const { context, useDispatch } = createReducableContext<RegisterState, RegisterActionTypes>(INITIAL_STATE);

export default context;

export const useRegisterDispach = useDispatch;
