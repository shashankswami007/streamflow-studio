import { cn } from '@/lib/utils';

interface WorldMapProps {
  countries: { name: string; count: number; code: string }[];
}

export function WorldMap({ countries }: WorldMapProps) {
  const maxCount = Math.max(...countries.map((c) => c.count));

  return (
    <div className="space-y-4">
      {/* Simplified world map representation */}
      <div className="relative h-[200px] rounded-xl bg-secondary/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-display font-bold text-foreground">
              {countries.length}
            </p>
            <p className="text-sm text-muted-foreground">Countries</p>
          </div>
        </div>
        
        {/* Animated dots representing listeners */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}
      </div>

      {/* Country list */}
      <div className="space-y-2">
        {countries.slice(0, 5).map((country) => (
          <div key={country.code} className="flex items-center gap-3">
            <div className="w-8 text-center text-xl">{getFlagEmoji(country.code)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{country.name}</span>
                <span className="text-sm text-muted-foreground">
                  {country.count.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(country.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
