import { Station } from '@/types/radio';
import { LiveIndicator } from './LiveIndicator';
import { Button } from '@/components/ui/button';
import { Users, Share2, Settings, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface StationCardProps {
  station: Station;
}

export function StationCard({ station }: StationCardProps) {
  return (
    <div className={cn(
      'glass rounded-xl p-6 transition-all duration-300 hover:border-primary/50',
      station.isLive && 'border-live/30 shadow-live/10'
    )}>
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <Play className="h-8 w-8 text-primary-foreground" />
          </div>
          {station.isLive && (
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-live animate-pulse border-2 border-background" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-foreground">{station.name}</h3>
            <LiveIndicator isLive={station.isLive} size="sm" />
          </div>
          <p className="text-sm text-muted-foreground">{station.genre}</p>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{station.description}</p>
          
          {station.isLive && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">
                {station.listenerCount.toLocaleString()}
              </span>
              <span className="text-muted-foreground">listeners</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link to={`/studio?station=${station.id}`} className="flex-1">
          <Button variant={station.isLive ? 'live' : 'default'} className="w-full">
            {station.isLive ? 'View Studio' : 'Go Live'}
          </Button>
        </Link>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
