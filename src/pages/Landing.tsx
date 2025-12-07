import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Radio,
  Headphones,
  BarChart3,
  Users,
  Share2,
  Mic2,
  Play,
  ArrowRight,
  Zap,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: Mic2,
    title: 'Go Live Instantly',
    description: 'Start broadcasting in seconds with our professional-grade streaming tools.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Track listeners, locations, and engagement with beautiful dashboards.',
  },
  {
    icon: Users,
    title: 'Invite Guests',
    description: 'Collaborate with co-hosts and guests with simple invite links.',
  },
  {
    icon: Share2,
    title: 'Share Everywhere',
    description: 'Generate custom URLs and share across all social platforms.',
  },
  {
    icon: Radio,
    title: 'Multi-Station Support',
    description: 'Manage multiple radio stations from a single dashboard.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Low-latency streaming with adaptive bitrate for the best experience.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Headphones className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">RadioHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="gradient">
                Start Broadcasting
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-live"></span>
            </span>
            <span className="text-sm text-muted-foreground">
              Trusted by 10,000+ broadcasters worldwide
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Your Radio Station,{' '}
            <span className="gradient-text">Everywhere</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">
            The all-in-one platform for hosting, streaming, and growing your online radio
            station. Go live in seconds, invite guests, and reach listeners worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="gradient" size="xl" className="glow">
                <Radio className="h-5 w-5" />
                Start Broadcasting Free
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Broadcasters' },
              { value: '50M+', label: 'Listeners' },
              { value: '180+', label: 'Countries' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Broadcast
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional tools for professional broadcasters. From live streaming to
              analytics, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="relative glass rounded-2xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative">
              <Globe className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Go Live?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of broadcasters who trust RadioHub for their streaming needs.
                Start your journey today.
              </p>
              <Link to="/dashboard">
                <Button variant="gradient" size="xl" className="glow">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Headphones className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">RadioHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RadioHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
