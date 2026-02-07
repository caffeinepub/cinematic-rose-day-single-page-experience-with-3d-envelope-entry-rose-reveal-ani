import { useState, useEffect, useRef } from 'react';

interface TimedRomanticLinesProps {
  onComplete: () => void;
}

export default function TimedRomanticLines({ onComplete }: TimedRomanticLinesProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const hasStartedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  
  // Keep onComplete ref up to date without triggering effect
  onCompleteRef.current = onComplete;

  const lines: string[] = [
    "I brought you a rose today…",
    "But then I realized…",
    "You're already the most beautiful rose there is.",
  ];

  useEffect(() => {
    // Only run once per page load
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const timers: NodeJS.Timeout[] = [];

    // Show first line immediately
    timers.push(setTimeout(() => setVisibleLines([0]), 300));

    // Show second line after pause
    timers.push(setTimeout(() => setVisibleLines([0, 1]), 2500));

    // Show third line after pause
    timers.push(setTimeout(() => setVisibleLines([0, 1, 2]), 4700));

    // Complete after final line is visible (only once)
    timers.push(setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onCompleteRef.current();
      }
    }, 5200));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []); // Empty deps - run once only

  return (
    <div className="timed-romantic-lines">
      {/* Rose emoji above first line */}
      <p className="rose-emoji-line">🌹</p>
      {lines.map((line, index) => (
        <p
          key={index}
          className={`romantic-line ${visibleLines.includes(index) ? 'visible' : ''} ${
            index === lines.length - 1 && visibleLines.includes(index) ? 'final-line' : ''
          }`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
