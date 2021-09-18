import { useCallback, useEffect, EffectCallback, DependencyList } from 'react';

export default function useDebouncedEffect(effect: EffectCallback, delay: number,  deps: DependencyList) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
}
