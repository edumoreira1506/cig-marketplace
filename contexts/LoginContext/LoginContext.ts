import { createReducableContext } from '@Utils/context';

import * as actions from './loginReducer';
import { INITIAL_STATE, LoginState } from './loginReducer';

const { context, useDispatch } = createReducableContext<LoginState>({ initialState: INITIAL_STATE, actions });

export default context;

export const useLoginDispatch = useDispatch;
