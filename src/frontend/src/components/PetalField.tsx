import { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export default function PetalField() {
  const petals = useMemo(() => {
    const petalArray: Petal[] = [];
    for (let i = 0; i < 20; i++) {
      petalArray.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 8,
        rotation: Math.random() * 360,
        size: 0.6 + Math.random() * 0.6,
      });
    }
    return petalArray;
  }, []);

  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `scale(${petal.size})`,
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path
              d="M15 5C15 5 10 8 10 12C10 16 13 18 15 18C17 18 20 16 20 12C20 8 15 5 15 5Z"
              fill="oklch(0.45 0.18 15)"
              opacity="0.85"
            />
            <path
              d="M15 25C15 25 10 22 10 18C10 14 13 12 15 12C17 12 20 14 20 18C20 22 15 25 15 25Z"
              fill="oklch(0.42 0.19 12)"
              opacity="0.85"
            />
            <path
              d="M5 15C5 15 8 10 12 10C16 10 18 13 18 15C18 17 16 20 12 20C8 20 5 15 5 15Z"
              fill="oklch(0.44 0.17 18)"
              opacity="0.85"
            />
            <path
              d="M25 15C25 15 22 10 18 10C14 10 12 13 12 15C12 17 14 20 18 20C22 20 25 15 25 15Z"
              fill="oklch(0.43 0.18 14)"
              opacity="0.85"
            />
            <ellipse cx="15" cy="15" rx="3" ry="3" fill="oklch(0.38 0.20 10)" opacity="0.9" />
          </svg>
        </div>
      ))}
    </div>
  );
}
