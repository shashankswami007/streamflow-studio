import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  isLive: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function LiveIndicator({ isLive, size = 'md', showText = true }: LiveIndicatorProps) {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'rounded-full',
          sizeClasses[size],
          isLive ? 'bg-live animate-pulse glow-live' : 'bg-offline'
        )}
      />
      {showText && (
        <span
          className={cn(
            'font-semibold uppercase tracking-wide',
            textSizes[size],
            isLive ? 'text-live' : 'text-muted-foreground'
          )}
        >
          {isLive ? 'On Air' : 'Offline'}
        </span>
      )}
    </div>
  );
}
