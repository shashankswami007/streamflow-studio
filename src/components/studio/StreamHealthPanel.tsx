import { StreamHealth } from '@/types/radio';
import { cn } from '@/lib/utils';
import { Signal, Clock, Gauge, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StreamHealthPanelProps {
  health: StreamHealth;
  isLive: boolean;
}

export function StreamHealthPanel({ health, isLive }: StreamHealthPanelProps) {
  const qualityColors = {
    excellent: 'text-success',
    good: 'text-primary',
    fair: 'text-warning',
    poor: 'text-destructive',
  };

  const metrics = [
    {
      icon: Signal,
      label: 'Bitrate',
      value: `${health.bitrate} kbps`,
      subValue: health.quality,
      color: qualityColors[health.quality],
    },
    {
      icon: Clock,
      label: 'Uptime',
      value: `${health.uptime}%`,
      progress: health.uptime,
    },
    {
      icon: Gauge,
      label: 'Buffer Health',
      value: `${health.bufferHealth}%`,
      progress: health.bufferHealth,
    },
  ];

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-foreground">Stream Health</h3>
        <div className="flex items-center gap-2">
          <Activity className={cn('h-4 w-4', isLive ? 'text-success' : 'text-muted-foreground')} />
          <span className={cn('text-sm font-medium', isLive ? 'text-success' : 'text-muted-foreground')}>
            {isLive ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('text-sm font-medium', metric.color || 'text-foreground')}>
                  {metric.value}
                </span>
                {metric.subValue && (
                  <span className={cn('text-xs uppercase', metric.color)}>
                    {metric.subValue}
                  </span>
                )}
              </div>
            </div>
            {metric.progress !== undefined && (
              <Progress value={metric.progress} className="h-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
