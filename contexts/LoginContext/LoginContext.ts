import createReducableContext from '@cig-platform/context';

import { INITIAL_STATE, LoginState, LoginActionTypes } from './loginReducer';

const { context, useDispatch, useSelector } = createReducableContext<LoginState, LoginActionTypes>(INITIAL_STATE);

export default context;

export const useLoginDispatch = useDispatch;

export const useLoginSelector = useSelector;
