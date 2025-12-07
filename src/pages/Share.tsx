import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SharePanel } from '@/components/share/SharePanel';
import { mockStations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { QrCode, ExternalLink, Radio, Check } from 'lucide-react';

export default function Share() {
  const [selectedStation, setSelectedStation] = useState(mockStations[0]);

  return (
    <DashboardLayout
      title="Share & Promote"
      subtitle="Generate shareable links and promote your stations."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Station Selector */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">
              Select Station
            </h3>
            <div className="space-y-2">
              {mockStations.map((station) => (
                <button
                  key={station.id}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left',
                    selectedStation.id === station.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-secondary'
                  )}
                  onClick={() => setSelectedStation(station)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Radio className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{station.name}</p>
                    <p className="text-sm text-muted-foreground">{station.genre}</p>
                  </div>
                  {selectedStation.id === station.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="lg:col-span-2 space-y-6">
          <SharePanel
            shareUrl={selectedStation.shareUrl}
            stationName={selectedStation.name}
          />

          {/* QR Code */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">
              QR Code
            </h3>
            <div className="flex items-center gap-6">
              <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-white">
                <QrCode className="h-24 w-24 text-background" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground mb-4">
                  Download this QR code to share your station on printed materials,
                  posters, or social media.
                </p>
                <Button variant="outline">
                  Download QR Code
                </Button>
              </div>
            </div>
          </div>

          {/* Embed Code */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">
              Embed Player
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add this code to your website to embed the radio player.
            </p>
            <div className="relative">
              <pre className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground overflow-x-auto">
                {`<iframe 
  src="https://${selectedStation.shareUrl}/embed" 
  width="100%" 
  height="150" 
  frameborder="0"
></iframe>`}
              </pre>
            </div>
            <Button variant="outline" className="mt-4">
              Copy Embed Code
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
