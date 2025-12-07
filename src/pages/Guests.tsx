import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuestCard } from '@/components/guests/GuestCard';
import { mockGuests } from '@/data/mockData';
import { Guest } from '@/types/radio';
import { UserPlus, Mail, Link, Copy, Check, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Guests() {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleMuteGuest = (id: string) => {
    setGuests(
      guests.map((g) => (g.id === id ? { ...g, isMuted: !g.isMuted } : g))
    );
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
    toast({
      title: 'Guest removed',
      description: 'The guest has been disconnected.',
    });
  };

  const handleSendInvite = () => {
    if (!inviteEmail) return;

    const newGuest: Guest = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      status: 'pending',
      isMuted: false,
    };

    setGuests([...guests, newGuest]);
    setInviteLink(`https://radio.app/join/${Date.now().toString(36)}`);

    toast({
      title: 'Invite sent!',
      description: `An invitation has been sent to ${inviteEmail}`,
    });
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const connectedGuests = guests.filter((g) => g.status === 'connected');
  const pendingGuests = guests.filter((g) => g.status === 'pending');

  return (
    <DashboardLayout
      title="Guest Management"
      subtitle="Invite and manage guests for your broadcasts."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invite Panel */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-6 sticky top-24">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">
              Invite a Guest
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Send an invite link to allow guests to join your live broadcast.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Guest Email
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="guest@example.com"
                      className="pl-9"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="gradient"
                className="w-full"
                onClick={handleSendInvite}
                disabled={!inviteEmail}
              >
                <UserPlus className="h-4 w-4" />
                Send Invite
              </Button>

              {inviteLink && (
                <div className="space-y-2 pt-4 border-t border-border">
                  <label className="text-sm font-medium text-muted-foreground">
                    Invite Link Generated
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={inviteLink}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyLink}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guests List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Connected Guests */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Connected ({connectedGuests.length})
            </h3>
            {connectedGuests.length === 0 ? (
              <div className="glass rounded-xl p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No guests connected</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {connectedGuests.map((guest) => (
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

          {/* Pending Invites */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-warning" />
              Pending Invites ({pendingGuests.length})
            </h3>
            {pendingGuests.length === 0 ? (
              <div className="glass rounded-xl p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No pending invites</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pendingGuests.map((guest) => (
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
      </div>
    </DashboardLayout>
  );
}
