import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { AudioVisualizer } from '@/components/studio/AudioVisualizer';
import { StreamHealthPanel } from '@/components/studio/StreamHealthPanel';
import { LiveIndicator } from '@/components/dashboard/LiveIndicator';
import { mockStations, mockStreamHealth, mockGuests } from '@/data/mockData';
import { GuestCard } from '@/components/guests/GuestCard';
import {
  Mic,
  MicOff,
  Radio,
  Users,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Studio() {
  const [isLive, setIsLive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [guests, setGuests] = useState(mockGuests);
  const { toast } = useToast();

  const station = mockStations[0];

  const handleToggleLive = () => {
    setIsLive(!isLive);
    toast({
      title: isLive ? 'Broadcast Stopped' : 'You are now live!',
      description: isLive
        ? 'Your stream has ended.'
        : 'Your broadcast is now live to all listeners.',
    });
  };

  const handleMuteGuest = (id: string) => {
    setGuests(
      guests.map((g) => (g.id === id ? { ...g, isMuted: !g.isMuted } : g))
    );
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
    toast({
      title: 'Guest removed',
      description: 'The guest has been disconnected from the stream.',
    });
  };

  return (
    <DashboardLayout
      title="Live Studio"
      subtitle={station.name}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Studio Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Control Panel */}
          <div className={cn(
            'glass rounded-xl p-8 transition-all duration-500',
            isLive && 'border-live/30 shadow-live/20'
          )}>
            <div className="flex items-center justify-between mb-6">
              <LiveIndicator isLive={isLive} size="lg" />
              {isLive && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="font-medium text-foreground">
                    {station.listenerCount.toLocaleString()}
                  </span>
                  <span>listening now</span>
                </div>
              )}
            </div>

            {/* Audio Visualizer */}
            <div className="relative rounded-xl bg-secondary/50 p-6 mb-6">
              <AudioVisualizer isActive={isLive && !isMuted} />
              {!isLive && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-xl">
                  <p className="text-muted-foreground">Start broadcast to see audio levels</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className={cn(isMuted && 'bg-destructive/10 border-destructive/30')}
                onClick={() => setIsMuted(!isMuted)}
                disabled={!isLive}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5 text-destructive" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant={isLive ? 'live' : 'gradient'}
                size="xl"
                className={cn(
                  'min-w-[200px]',
                  isLive && 'shadow-live/50'
                )}
                onClick={handleToggleLive}
              >
                <Radio className="h-5 w-5" />
                {isLive ? 'Stop Broadcast' : 'Go Live'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                disabled={!isLive}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Connected Guests */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-foreground">
                Connected Guests
              </h3>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4" />
                Invite Guest
              </Button>
            </div>

            {guests.filter((g) => g.status === 'connected').length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No guests connected</p>
                <p className="text-sm">Invite guests to join your broadcast</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {guests
                  .filter((g) => g.status === 'connected')
                  .map((guest) => (
                    <GuestCard
                      key={guest.id}
                      guest={guest}
                      onMuteToggle={handleMuteGuest}
                      onRemove={handleRemoveGuest}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <StreamHealthPanel health={mockStreamHealth} isLive={isLive} />

          {/* Quick Stats */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">
              Session Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-mono text-foreground">
                  {isLive ? '02:34:18' : '--:--:--'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Peak Listeners</span>
                <span className="font-mono text-foreground">
                  {isLive ? '1,847' : '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Plays</span>
                <span className="font-mono text-foreground">
                  {isLive ? '3,421' : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
