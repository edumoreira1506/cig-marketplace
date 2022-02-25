import { AppState } from './appReducer';

export const selectIsLoading = (state: AppState) => state.isLoading;

export const selectError = (state: AppState) => state.error;

export const selectFavorites = (state: AppState) => state.favorites;
