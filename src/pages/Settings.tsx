import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Globe,
  Save,
} from 'lucide-react';

export default function Settings() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    timezone: 'UTC-5',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    guestJoinAlerts: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: 'Settings saved',
      description: 'Your profile has been updated successfully.',
    });
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account and preferences.">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="glass p-1">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="stream" className="gap-2">
            <Volume2 className="h-4 w-4" />
            Stream
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="glass rounded-xl p-6 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Profile Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Update your account details and public profile.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <Input
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="gradient" onClick={handleSaveProfile}>
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="glass rounded-xl p-6 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Notification Preferences
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose how you want to be notified about activity.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: 'emailNotifications',
                  label: 'Email Notifications',
                  description: 'Receive notifications via email',
                },
                {
                  key: 'pushNotifications',
                  label: 'Push Notifications',
                  description: 'Receive push notifications in your browser',
                },
                {
                  key: 'weeklyDigest',
                  label: 'Weekly Digest',
                  description: 'Get a weekly summary of your analytics',
                },
                {
                  key: 'guestJoinAlerts',
                  label: 'Guest Join Alerts',
                  description: 'Get notified when guests join your broadcast',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Stream Tab */}
        <TabsContent value="stream">
          <div className="glass rounded-xl p-6 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Stream Settings
              </h3>
              <p className="text-sm text-muted-foreground">
                Configure your streaming quality and preferences.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-foreground mb-2">Audio Bitrate</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Higher bitrate means better quality but more bandwidth.
                  </p>
                  <div className="flex gap-2">
                    {['128', '192', '256', '320'].map((bitrate) => (
                      <Button
                        key={bitrate}
                        variant={bitrate === '320' ? 'default' : 'outline'}
                        size="sm"
                      >
                        {bitrate}k
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-foreground mb-2">Auto-Reconnect</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Automatically reconnect if your stream drops.
                  </p>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="font-medium text-foreground mb-2">Stream Key</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use this key to connect external broadcasting software.
                  </p>
                  <Input
                    type="password"
                    value="rtmp://stream.radio.app/live/abc123xyz"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="glass rounded-xl p-6 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Security Settings
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your account security and authentication.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Change Password</p>
                    <p className="text-sm text-muted-foreground">
                      Update your account password
                    </p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Active Sessions</p>
                    <p className="text-sm text-muted-foreground">
                      Manage devices logged into your account
                    </p>
                  </div>
                  <Button variant="outline">View All</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
