import { useLocalStorage } from '@cig-platform/hooks';
import { IBreeder, IUser, IAdvertisingFavorite } from '@cig-platform/types';
import { useMemo } from 'react';
import jwt from 'jsonwebtoken';

interface IDecodedToken {
  breeders: IBreeder[];
  email: IUser['email'];
  id: IUser['id'];
  name: IUser['name'];
  favorites: IAdvertisingFavorite[];
}

export default function useUser() {
  const { get } = useLocalStorage('token');

  return useMemo(() => {
    try {
      const localStorageToken = get();

      const decodedToken = jwt.decode(localStorageToken) as IDecodedToken;
  
      return {
        ...decodedToken,
        image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
      };
    } catch {
      return { 
        image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
        name: '',
        breeders: [],
        favorites: [],
      };
    }
  }, [get]);
}
