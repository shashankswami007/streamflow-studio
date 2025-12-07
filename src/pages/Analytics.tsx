import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ListenerChart } from '@/components/analytics/ListenerChart';
import { DeviceChart } from '@/components/analytics/DeviceChart';
import { WorldMap } from '@/components/analytics/WorldMap';
import { mockAnalytics } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Clock, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'hourly' | 'weekly'>('hourly');

  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Detailed insights into your audience and performance."
    >
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Listeners"
          value={mockAnalytics.totalListeners.toLocaleString()}
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Peak Listeners"
          value={mockAnalytics.peakListeners.toLocaleString()}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Avg. Listen Time"
          value={`${mockAnalytics.avgListenTime} min`}
          icon={<Clock className="h-6 w-6 text-primary" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="Countries Reached"
          value={mockAnalytics.countries.length}
          icon={<Globe className="h-6 w-6 text-primary" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Listener Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Listener Trends
              </h3>
              <p className="text-sm text-muted-foreground">
                {timeRange === 'hourly' ? 'Last 24 hours' : 'Last 7 days'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={timeRange === 'hourly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('hourly')}
              >
                Hourly
              </Button>
              <Button
                variant={timeRange === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('weekly')}
              >
                Weekly
              </Button>
            </div>
          </div>
          <ListenerChart
            data={timeRange === 'hourly' ? mockAnalytics.hourlyData : mockAnalytics.weeklyData}
            type={timeRange}
          />
        </div>

        {/* Device Breakdown */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">
            Device Breakdown
          </h3>
          <DeviceChart data={mockAnalytics.devices} />
        </div>
      </div>

      {/* Geographic Data */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* World Map */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">
            Geographic Distribution
          </h3>
          <WorldMap countries={mockAnalytics.countries} />
        </div>

        {/* Top Cities */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">
            Top Cities
          </h3>
          <div className="space-y-4">
            {mockAnalytics.cities.map((city, index) => (
              <div key={city.name} className="flex items-center gap-4">
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                    index === 0
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{city.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {city.count.toLocaleString()} listeners
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${(city.count / mockAnalytics.cities[0].count) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
