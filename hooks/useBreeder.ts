import { useMemo } from 'react';

import useAuth from './useAuth';

export default function useBreeder() {
  const { user } = useAuth();

  return useMemo(() => user.breeders?.[0], [user?.breeders]);
}
