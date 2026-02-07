import { useState, useEffect, useRef } from 'react';

interface UseCacheBustedImageSrcOptions {
  src: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function useCacheBustedImageSrc({ src, onLoad, onError }: UseCacheBustedImageSrcOptions) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const hasRetriedRef = useRef(false);

  useEffect(() => {
    // Reset state when src changes
    setLoaded(false);
    setError(false);
    setCurrentSrc(src);
    hasRetriedRef.current = false;
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    setError(false);
    onLoad?.();
  };

  const handleError = () => {
    // If we haven't retried yet, try with cache-busting query string
    if (!hasRetriedRef.current) {
      hasRetriedRef.current = true;
      const cacheBuster = `?t=${Date.now()}`;
      setCurrentSrc(src + cacheBuster);
    } else {
      // After retry, mark as error
      setError(true);
      setLoaded(false);
      onError?.();
    }
  };

  return {
    src: currentSrc,
    loaded,
    error,
    handleLoad,
    handleError,
  };
}
