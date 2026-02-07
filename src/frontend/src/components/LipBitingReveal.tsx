import { useCacheBustedImageSrc } from '../hooks/useCacheBustedImageSrc';

export default function LipBitingReveal() {
  const { src, loaded, error, handleLoad, handleError } = useCacheBustedImageSrc({
    src: '/assets/generated/lip-biting-emoji-cartoon.dim_900x1100.png',
  });

  return (
    <div className="lip-biting-static">
      {/* Only render image if it loaded successfully */}
      {loaded && !error && (
        <div className="lip-biting-container visible">
          <img
            src={src}
            alt="Lip biting emoji"
            className="lip-biting-image"
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}
      {/* Emoji line above caption */}
      <p className="lip-biting-emoji-line">
        😍
      </p>
      {/* Caption always renders, even if image fails */}
      <p className="lip-biting-caption">
        This is when I see you:)
      </p>
    </div>
  );
}
