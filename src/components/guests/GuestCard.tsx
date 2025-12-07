import { Guest } from '@/types/radio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, PhoneOff, User } from 'lucide-react';

interface GuestCardProps {
  guest: Guest;
  onMuteToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function GuestCard({ guest, onMuteToggle, onRemove }: GuestCardProps) {
  const statusColors = {
    pending: 'bg-warning/10 text-warning border-warning/30',
    connected: 'bg-success/10 text-success border-success/30',
    disconnected: 'bg-muted text-muted-foreground border-muted',
  };

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          {guest.status === 'connected' && (
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-foreground">{guest.name}</h4>
          <p className="text-sm text-muted-foreground">{guest.email}</p>
        </div>

        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium border',
            statusColors[guest.status]
          )}
        >
          {guest.status}
        </span>
      </div>

      {guest.status === 'connected' && (
        <div className="mt-4 flex gap-2">
          <Button
            variant={guest.isMuted ? 'destructive' : 'secondary'}
            size="sm"
            className="flex-1"
            onClick={() => onMuteToggle(guest.id)}
          >
            {guest.isMuted ? (
              <>
                <MicOff className="h-4 w-4" />
                Unmute
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" />
                Mute
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onRemove(guest.id)}
          >
            <PhoneOff className="h-4 w-4" />
            Remove
          </Button>
        </div>
      )}

      {guest.status === 'pending' && (
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full">
            Resend Invite
          </Button>
        </div>
      )}
    </div>
  );
}
