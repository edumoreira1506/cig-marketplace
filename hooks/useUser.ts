import { useLocalStorage } from '@cig-platform/hooks';
import { IBreeder, IUser, IAdvertisingFavorite } from '@cig-platform/types';
import { useMemo } from 'react';
import jwt from 'jsonwebtoken';

import { useAppDispatch, useAppSelector } from '@Contexts/AppContext/AppContext';
import { selectFavorites } from '@Contexts/AppContext/appSelectors';
import { setFavorites as setFavorites } from '@Contexts/AppContext/appActions';

export interface IDecodedToken {
  breeders: IBreeder[];
  email: IUser['email'];
  id: IUser['id'];
  name: IUser['name'];
  favorites: IAdvertisingFavorite[];
  registerType: IUser['registerType']
}

export default function useUser() {
  const { get } = useLocalStorage('token');

  const favorites = useAppSelector(selectFavorites);

  const dispatch = useAppDispatch();

  return useMemo(() => {
    try {
      const localStorageToken = get();

      const decodedToken = jwt.decode(localStorageToken) as IDecodedToken;

      if (decodedToken.favorites.length && !favorites.length) {
        dispatch(setFavorites(decodedToken.favorites));
      }
  
      return {
        ...decodedToken,
        image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
        favorites
      };
    } catch {
      return { 
        image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
        name: '',
        breeders: [],
        favorites,
        registerType: '',
        id: ''
      };
    }
  }, [get, favorites, dispatch]);
}
