import { DefaultState, ActionType } from '@cig-platform/context';
import { IAdvertisingFavorite } from '@cig-platform/types';

import * as actions from './appActions';

export type AppState = DefaultState & {
  favorites: IAdvertisingFavorite[];
}

export const INITIAL_STATE: AppState = {
  favorites: []
};

export type AppActionTypes = ActionType<typeof actions>

export default function appReducer(
  state = INITIAL_STATE,
  action: AppActionTypes
): AppState {
  switch (action.type) {
  case 'SET_IS_LOADING':
    return { ...state, isLoading: action.payload.isLoading };
  case 'SET_ERROR':
    return { ...state, error: action.payload.error };
  case 'SET_FAVORITES':
    return { ...state, favorites: action.payload.favorites };
  default:
    return state;
  }
}
