import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Radio,
  Music,
  Mic2,
  ArrowRight,
  ArrowLeft,
  Check,
  Headphones,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const genres = [
  { name: 'Electronic / House', icon: '🎧' },
  { name: 'Jazz / Blues', icon: '🎷' },
  { name: 'Rock / Alternative', icon: '🎸' },
  { name: 'Hip Hop / R&B', icon: '🎤' },
  { name: 'Pop / Top 40', icon: '🎵' },
  { name: 'Classical', icon: '🎻' },
  { name: 'Country', icon: '🤠' },
  { name: 'Reggae / Dancehall', icon: '🌴' },
  { name: 'Talk / Podcast', icon: '💬' },
  { name: 'News / Sports', icon: '📰' },
];

export default function NewStation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [station, setStation] = useState({
    name: '',
    genre: '',
    description: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast({
        title: 'Station created!',
        description: `${station.name} is now ready to broadcast.`,
      });
      navigate('/stations');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/stations');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return station.name.length > 0;
      case 2:
        return station.genre.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mx-auto mb-4">
            <Headphones className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Create Your Station
          </h1>
          <p className="text-muted-foreground">
            Set up your radio station in just a few steps
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all',
                  step >= s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    'w-16 h-1 mx-2 rounded-full transition-all',
                    step > s ? 'bg-primary' : 'bg-secondary'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <Radio className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  Name Your Station
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose a memorable name for your radio station
                </p>
              </div>
              <Input
                placeholder="e.g., Wave FM, Jazz Corner, Rock Nation"
                value={station.name}
                onChange={(e) => setStation({ ...station, name: e.target.value })}
                className="text-center text-lg h-14"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <Music className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  Select Your Genre
                </h2>
                <p className="text-sm text-muted-foreground">
                  What type of content will you broadcast?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre.name}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left',
                      station.genre === genre.name
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    )}
                    onClick={() => setStation({ ...station, genre: genre.name })}
                  >
                    <span className="text-2xl">{genre.icon}</span>
                    <span className="text-sm font-medium text-foreground">
                      {genre.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <Mic2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  Describe Your Station
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tell your listeners what makes your station special
                </p>
              </div>
              <Textarea
                placeholder="e.g., The best electronic music 24/7, featuring top DJs from around the world..."
                value={station.description}
                onChange={(e) =>
                  setStation({ ...station, description: e.target.value })
                }
                className="min-h-[120px]"
              />

              {/* Preview */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  Preview
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                    <Radio className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">
                      {station.name || 'Station Name'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {station.genre || 'Genre'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            variant="gradient"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {step === 3 ? 'Create Station' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
