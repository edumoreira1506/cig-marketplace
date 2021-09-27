import createReducableContext from '@cig-platform/context';

import loginReducer, { INITIAL_STATE, LoginState, LoginActionTypes } from './loginReducer';

const { context, useDispatch, useSelector, provider } = createReducableContext<LoginState, LoginActionTypes>(INITIAL_STATE, loginReducer);

export default context;

export const useLoginDispatch = useDispatch;

export const useLoginSelector = useSelector;

export const LoginProvider = provider;
