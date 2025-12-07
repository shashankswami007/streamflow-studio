export interface Station {
  id: string;
  name: string;
  genre: string;
  description: string;
  imageUrl: string;
  isLive: boolean;
  listenerCount: number;
  createdAt: string;
  shareUrl: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'connected' | 'disconnected';
  isMuted: boolean;
  joinedAt?: string;
}

export interface AnalyticsData {
  totalListeners: number;
  peakListeners: number;
  avgListenTime: number;
  countries: { name: string; count: number; code: string }[];
  cities: { name: string; count: number }[];
  devices: { type: string; count: number; percentage: number }[];
  hourlyData: { hour: string; listeners: number }[];
  weeklyData: { day: string; listeners: number }[];
}

export interface StreamHealth {
  bitrate: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  uptime: number;
  bufferHealth: number;
}
