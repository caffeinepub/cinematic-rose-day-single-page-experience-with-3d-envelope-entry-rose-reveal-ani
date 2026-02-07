import { useSafeImage } from '../hooks/useSafeImage';

export default function RoseReveal() {
  const { loaded, error, handleLoad, handleError } = useSafeImage();

  // Don't render if image failed to load
  if (error) {
    return null;
  }

  return (
    <div className="rose-reveal">
      <div className={`rose-container ${loaded ? 'revealing' : ''}`}>
        <img
          src="/assets/generated/f9aa8c0055136ac1bcbba2a30846c19f.jpg"
          alt="Beautiful rose"
          className="rose-image"
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}
