import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StationCard } from '@/components/dashboard/StationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockStations } from '@/data/mockData';
import { Station } from '@/types/radio';
import { Plus, Radio, Music, Mic2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const genres = [
  'Electronic / House',
  'Jazz / Blues',
  'Rock / Alternative',
  'Hip Hop / R&B',
  'Pop / Top 40',
  'Classical',
  'Country',
  'Reggae / Dancehall',
  'Talk / Podcast',
  'News / Sports',
];

export default function Stations() {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStation, setNewStation] = useState({
    name: '',
    genre: '',
    description: '',
  });
  const { toast } = useToast();

  const handleCreateStation = () => {
    if (!newStation.name || !newStation.genre) return;

    const station: Station = {
      id: Date.now().toString(),
      name: newStation.name,
      genre: newStation.genre,
      description: newStation.description,
      imageUrl: '/placeholder.svg',
      isLive: false,
      listenerCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      shareUrl: `radio.app/${newStation.name.toLowerCase().replace(/\s+/g, '-')}`,
    };

    setStations([...stations, station]);
    setNewStation({ name: '', genre: '', description: '' });
    setIsDialogOpen(false);

    toast({
      title: 'Station created!',
      description: `${station.name} is now ready to broadcast.`,
    });
  };

  return (
    <DashboardLayout
      title="Stations Manager"
      subtitle="Manage all your radio stations in one place."
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Radio className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-foreground">
              {stations.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Stations</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" size="lg">
              <Plus className="h-5 w-5" />
              Create Station
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create New Station</DialogTitle>
              <DialogDescription>
                Set up a new radio station to start broadcasting.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Station Name</label>
                <Input
                  placeholder="My Awesome Radio"
                  value={newStation.name}
                  onChange={(e) =>
                    setNewStation({ ...newStation, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Genre</label>
                <Select
                  value={newStation.genre}
                  onValueChange={(value) =>
                    setNewStation({ ...newStation, genre: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Tell listeners what your station is about..."
                  value={newStation.description}
                  onChange={(e) =>
                    setNewStation({ ...newStation, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="gradient"
                onClick={handleCreateStation}
                disabled={!newStation.name || !newStation.genre}
              >
                Create Station
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}

        {/* Add Station Card */}
        <button
          className="glass rounded-xl p-6 border-dashed border-2 flex flex-col items-center justify-center gap-4 min-h-[200px] hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-foreground">Add New Station</p>
            <p className="text-sm text-muted-foreground">
              Create another station to broadcast
            </p>
          </div>
        </button>
      </div>
    </DashboardLayout>
  );
}
