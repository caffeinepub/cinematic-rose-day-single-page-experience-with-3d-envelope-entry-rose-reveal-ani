import { useCacheBustedImageSrc } from '../hooks/useCacheBustedImageSrc';

export default function RoseReveal() {
  const { src, loaded, error, handleLoad, handleError } = useCacheBustedImageSrc({
    src: '/assets/generated/dog-holding-rose.jpg',
  });

  // Don't render if image failed to load
  if (error) {
    return null;
  }

  return (
    <div className="rose-reveal">
      <div className={`rose-container ${loaded ? 'revealing' : ''}`}>
        <img
          src={src}
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
