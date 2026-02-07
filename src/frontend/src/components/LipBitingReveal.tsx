import { useState, useEffect, useRef } from 'react';
import { useSafeImage } from '../hooks/useSafeImage';

interface LipBitingRevealProps {
  onComplete: () => void;
  mode?: 'timed' | 'static';
}

export default function LipBitingReveal({ onComplete, mode = 'timed' }: LipBitingRevealProps) {
  const { loaded, error, handleLoad, handleError } = useSafeImage();
  const [isVisible, setIsVisible] = useState(mode === 'static');
  const hasStartedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  
  // Keep onComplete ref up to date without triggering effect
  onCompleteRef.current = onComplete;

  // Handle timed reveal flow (only in 'timed' mode)
  useEffect(() => {
    if (mode !== 'timed') return;
    
    // Only run once per page load when image loads successfully
    if (hasStartedRef.current || !loaded) return;
    hasStartedRef.current = true;

    // Show image and caption
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Complete after visible for a moment (only once)
    const completeTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onCompleteRef.current();
      }
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [loaded, mode]);

  // Handle image load failure - advance flow immediately (only in 'timed' mode)
  useEffect(() => {
    if (mode !== 'timed') return;
    
    if (error && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      // Advance to final stage even when image fails
      onCompleteRef.current();
    }
  }, [error, mode]);

  // In static mode, show immediately when loaded
  useEffect(() => {
    if (mode === 'static' && loaded) {
      setIsVisible(true);
    }
  }, [loaded, mode]);

  // Don't render if image failed to load
  if (error) {
    return null;
  }

  // In static mode, apply different styling class
  const containerClass = mode === 'static' ? 'lip-biting-static' : 'lip-biting-reveal';

  return (
    <div className={containerClass}>
      <div className={`lip-biting-container ${isVisible ? 'visible' : ''}`}>
        <img
          src="/assets/generated/f9aa8c0055136ac1bcbba2a30846c19f-1.jpg"
          alt="Lip biting emoji"
          className="lip-biting-image"
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      </div>
      {isVisible && (
        <p className="lip-biting-caption">
          This is me when I see you:)
        </p>
      )}
    </div>
  );
}
