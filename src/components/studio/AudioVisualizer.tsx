import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AudioVisualizerProps {
  isActive: boolean;
  className?: string;
}

export function AudioVisualizer({ isActive, className }: AudioVisualizerProps) {
  const [bars, setBars] = useState<number[]>(Array(32).fill(0));

  useEffect(() => {
    if (!isActive) {
      setBars(Array(32).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(
        Array(32)
          .fill(0)
          .map(() => Math.random() * 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className={cn('flex items-end justify-center gap-1 h-24', className)}>
      {bars.map((height, index) => (
        <div
          key={index}
          className={cn(
            'w-1.5 rounded-full transition-all duration-100',
            isActive ? 'bg-primary' : 'bg-muted'
          )}
          style={{
            height: `${Math.max(isActive ? height : 10, 4)}%`,
            opacity: isActive ? 0.5 + (height / 100) * 0.5 : 0.3,
          }}
        />
      ))}
    </div>
  );
}
