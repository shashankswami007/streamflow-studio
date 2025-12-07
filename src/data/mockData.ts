import { Station, Guest, AnalyticsData, StreamHealth } from '@/types/radio';

export const mockStations: Station[] = [
  {
    id: '1',
    name: 'Wave FM',
    genre: 'Electronic / House',
    description: 'The best electronic music 24/7',
    imageUrl: '/placeholder.svg',
    isLive: true,
    listenerCount: 1247,
    createdAt: '2024-01-15',
    shareUrl: 'radio.app/wave-fm',
  },
  {
    id: '2',
    name: 'Jazz Lounge',
    genre: 'Jazz / Blues',
    description: 'Smooth jazz for your soul',
    imageUrl: '/placeholder.svg',
    isLive: false,
    listenerCount: 0,
    createdAt: '2024-02-20',
    shareUrl: 'radio.app/jazz-lounge',
  },
  {
    id: '3',
    name: 'Rock Nation',
    genre: 'Rock / Alternative',
    description: 'Pure rock energy',
    imageUrl: '/placeholder.svg',
    isLive: false,
    listenerCount: 0,
    createdAt: '2024-03-10',
    shareUrl: 'radio.app/rock-nation',
  },
];

export const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'connected',
    isMuted: false,
    joinedAt: '2024-03-15T10:30:00',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    status: 'pending',
    isMuted: false,
  },
];

export const mockAnalytics: AnalyticsData = {
  totalListeners: 12847,
  peakListeners: 3256,
  avgListenTime: 45,
  countries: [
    { name: 'United States', count: 4521, code: 'US' },
    { name: 'United Kingdom', count: 2134, code: 'GB' },
    { name: 'Germany', count: 1876, code: 'DE' },
    { name: 'Canada', count: 1245, code: 'CA' },
    { name: 'France', count: 987, code: 'FR' },
    { name: 'Australia', count: 756, code: 'AU' },
    { name: 'Japan', count: 654, code: 'JP' },
    { name: 'Brazil', count: 543, code: 'BR' },
  ],
  cities: [
    { name: 'New York', count: 1234 },
    { name: 'London', count: 987 },
    { name: 'Berlin', count: 876 },
    { name: 'Toronto', count: 654 },
    { name: 'Paris', count: 543 },
  ],
  devices: [
    { type: 'Mobile', count: 6423, percentage: 50 },
    { type: 'Desktop', count: 5138, percentage: 40 },
    { type: 'Tablet', count: 1286, percentage: 10 },
  ],
  hourlyData: [
    { hour: '00:00', listeners: 450 },
    { hour: '02:00', listeners: 280 },
    { hour: '04:00', listeners: 180 },
    { hour: '06:00', listeners: 320 },
    { hour: '08:00', listeners: 890 },
    { hour: '10:00', listeners: 1250 },
    { hour: '12:00', listeners: 1680 },
    { hour: '14:00', listeners: 1420 },
    { hour: '16:00', listeners: 1890 },
    { hour: '18:00', listeners: 2340 },
    { hour: '20:00', listeners: 2890 },
    { hour: '22:00', listeners: 1560 },
  ],
  weeklyData: [
    { day: 'Mon', listeners: 8450 },
    { day: 'Tue', listeners: 9230 },
    { day: 'Wed', listeners: 8890 },
    { day: 'Thu', listeners: 9560 },
    { day: 'Fri', listeners: 12340 },
    { day: 'Sat', listeners: 15670 },
    { day: 'Sun', listeners: 14230 },
  ],
};

export const mockStreamHealth: StreamHealth = {
  bitrate: 320,
  quality: 'excellent',
  uptime: 98.7,
  bufferHealth: 95,
};
