import React, { useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  suffix = '',
  duration = 1100,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing power3.out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};