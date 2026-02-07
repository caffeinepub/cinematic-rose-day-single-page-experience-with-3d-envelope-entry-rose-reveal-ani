import { useRef } from 'react';
import { useSafeImage } from '../hooks/useSafeImage';

interface EnvelopeEntryProps {
  onOpen: () => void;
}

export default function EnvelopeEntry({ onOpen }: EnvelopeEntryProps) {
  const { loaded, error, handleLoad, handleError } = useSafeImage();
  const hasOpenedRef = useRef(false);

  const handleClick = () => {
    if (hasOpenedRef.current || !loaded) return;
    hasOpenedRef.current = true;
    
    const wrapper = document.querySelector('.envelope-wrapper');
    if (wrapper) {
      wrapper.classList.add('opening');
    }
    
    // Wait for animation to complete before transitioning
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  // Don't render if image failed to load
  if (error) {
    return null;
  }

  return (
    <div className="envelope-entry">
      <div 
        className={`envelope-wrapper ${loaded ? 'loaded' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <img
          src="/assets/generated/envelope-textured.dim_1400x900.png"
          alt="Elegant envelope"
          className="envelope-image"
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      </div>
      
      {loaded && (
        <p className="envelope-caption">
          For Noor — tap gently 🌹
        </p>
      )}
    </div>
  );
}
