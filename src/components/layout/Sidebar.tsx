import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Radio,
  LayoutDashboard,
  Mic2,
  BarChart3,
  Users,
  Share2,
  Settings,
  Plus,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Live Studio', href: '/studio', icon: Mic2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Guests', href: '/guests', icon: Users },
  { name: 'Share', href: '/share', icon: Share2 },
  { name: 'Stations', href: '/stations', icon: Radio },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Headphones className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-sidebar-foreground">
            RadioHub
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
                {item.name}
                {item.name === 'Live Studio' && (
                  <span className="ml-auto flex h-2 w-2 rounded-full bg-live animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Create Station Button */}
        <div className="border-t border-sidebar-border p-4">
          <Link to="/stations/new">
            <Button variant="gradient" className="w-full">
              <Plus className="h-4 w-4" />
              Create Station
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
