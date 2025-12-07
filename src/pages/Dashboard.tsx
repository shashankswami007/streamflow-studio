import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StationCard } from '@/components/dashboard/StationCard';
import { ListenerChart } from '@/components/analytics/ListenerChart';
import { mockStations, mockAnalytics } from '@/data/mockData';
import { Users, Radio, Clock, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const liveStation = mockStations.find((s) => s.isLive);

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back! Here's your broadcasting overview.">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Listeners"
          value={mockAnalytics.totalListeners.toLocaleString()}
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Active Stations"
          value={mockStations.filter((s) => s.isLive).length}
          icon={<Radio className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Avg. Listen Time"
          value={`${mockAnalytics.avgListenTime} min`}
          icon={<Clock className="h-6 w-6 text-primary" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="Peak Listeners"
          value={mockAnalytics.peakListeners.toLocaleString()}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Listener Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Listener Activity
              </h3>
              <p className="text-sm text-muted-foreground">
                Listeners over the past 24 hours
              </p>
            </div>
          </div>
          <ListenerChart data={mockAnalytics.hourlyData} type="hourly" />
        </div>

        {/* Quick Stats */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">
            Top Countries
          </h3>
          <div className="space-y-4">
            {mockAnalytics.countries.slice(0, 5).map((country, index) => (
              <div key={country.code} className="flex items-center gap-3">
                <span className="text-lg font-medium text-muted-foreground w-6">
                  {index + 1}
                </span>
                <span className="text-xl">
                  {String.fromCodePoint(
                    ...country.code
                      .toUpperCase()
                      .split('')
                      .map((char) => 127397 + char.charCodeAt(0))
                  )}
                </span>
                <span className="flex-1 text-sm text-foreground">{country.name}</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {country.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stations */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg font-bold text-foreground">Your Stations</h3>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockStations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
