import { createReducableContext } from '@Utils/context';

import { INITIAL_STATE, RegisterState } from './registerReducer';
import * as actions from './registerActions';

const { context, useDispatch } = createReducableContext<RegisterState>({ initialState: INITIAL_STATE, actions });

export default context;

export const useRegisterDispach = useDispatch;
