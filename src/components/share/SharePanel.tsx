import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SharePanelProps {
  shareUrl: string;
  stationName: string;
}

const socialPlatforms = [
  {
    name: 'WhatsApp',
    icon: '📱',
    color: 'hover:bg-green-500/20 hover:border-green-500/50',
    getUrl: (url: string, text: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    name: 'X (Twitter)',
    icon: '𝕏',
    color: 'hover:bg-neutral-500/20 hover:border-neutral-500/50',
    getUrl: (url: string, text: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: '📘',
    color: 'hover:bg-blue-500/20 hover:border-blue-500/50',
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'hover:bg-blue-600/20 hover:border-blue-600/50',
    getUrl: (url: string, text: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export function SharePanel({ shareUrl, stationName }: SharePanelProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const fullUrl = `https://${shareUrl}`;
  const shareText = `🎙️ Listen to ${stationName} live now!`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast({
      title: 'Link copied!',
      description: 'The share link has been copied to your clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: (typeof socialPlatforms)[0]) => {
    const url = platform.getUrl(fullUrl, shareText);
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-2">
          Share Your Station
        </h3>
        <p className="text-sm text-muted-foreground">
          Share your radio station with your audience across social platforms.
        </p>
      </div>

      {/* URL Copy */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Station URL</label>
        <div className="flex gap-2">
          <Input
            value={fullUrl}
            readOnly
            className="bg-secondary font-mono text-sm"
          />
          <Button
            variant="default"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(fullUrl, '_blank')}
            className="shrink-0"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Social Sharing */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">
          Share on Social Media
        </label>
        <div className="grid grid-cols-2 gap-2">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className={cn('justify-start gap-3', platform.color)}
              onClick={() => handleSocialShare(platform)}
            >
              <span className="text-lg">{platform.icon}</span>
              {platform.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
