import { useState, useCallback } from 'react';

export function useSafeImage() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setError(false);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(false);
  }, []);

  return {
    loaded,
    error,
    handleLoad,
    handleError,
  };
}
