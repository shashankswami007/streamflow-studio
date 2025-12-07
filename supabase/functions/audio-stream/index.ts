import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Store connected clients by station
const stations = new Map<string, {
  broadcaster: WebSocket | null;
  listeners: Set<WebSocket>;
  metadata: {
    stationName: string;
    startedAt: string;
    listenerCount: number;
  };
}>();

const getOrCreateStation = (stationId: string, stationName: string = 'Unknown Station') => {
  if (!stations.has(stationId)) {
    stations.set(stationId, {
      broadcaster: null,
      listeners: new Set(),
      metadata: {
        stationName,
        startedAt: new Date().toISOString(),
        listenerCount: 0,
      },
    });
    console.log(`[Station ${stationId}] Created new station: ${stationName}`);
  }
  return stations.get(stationId)!;
};

const broadcastToListeners = (stationId: string, data: string | ArrayBuffer) => {
  const station = stations.get(stationId);
  if (!station) return;

  const deadListeners: WebSocket[] = [];
  
  station.listeners.forEach((listener) => {
    try {
      if (listener.readyState === WebSocket.OPEN) {
        listener.send(data);
      } else {
        deadListeners.push(listener);
      }
    } catch (error) {
      console.error(`[Station ${stationId}] Error sending to listener:`, error);
      deadListeners.push(listener);
    }
  });

  // Clean up dead connections
  deadListeners.forEach((listener) => {
    station.listeners.delete(listener);
    station.metadata.listenerCount = station.listeners.size;
  });
};

const handleBroadcaster = (socket: WebSocket, stationId: string, stationName: string) => {
  const station = getOrCreateStation(stationId, stationName);
  
  if (station.broadcaster && station.broadcaster.readyState === WebSocket.OPEN) {
    console.log(`[Station ${stationId}] Broadcaster already connected, rejecting new connection`);
    socket.close(4001, 'Broadcaster already connected');
    return;
  }

  station.broadcaster = socket;
  station.metadata.startedAt = new Date().toISOString();
  console.log(`[Station ${stationId}] Broadcaster connected`);

  // Notify listeners that broadcast started
  broadcastToListeners(stationId, JSON.stringify({
    type: 'broadcast_started',
    stationId,
    stationName,
    timestamp: new Date().toISOString(),
  }));

  socket.onmessage = (event) => {
    // Forward audio data to all listeners
    broadcastToListeners(stationId, event.data);
  };

  socket.onclose = () => {
    console.log(`[Station ${stationId}] Broadcaster disconnected`);
    station.broadcaster = null;
    
    // Notify listeners that broadcast ended
    broadcastToListeners(stationId, JSON.stringify({
      type: 'broadcast_ended',
      stationId,
      timestamp: new Date().toISOString(),
    }));
  };

  socket.onerror = (error) => {
    console.error(`[Station ${stationId}] Broadcaster error:`, error);
  };

  // Send confirmation to broadcaster
  socket.send(JSON.stringify({
    type: 'broadcaster_connected',
    stationId,
    listenerCount: station.listeners.size,
  }));
};

const handleListener = (socket: WebSocket, stationId: string) => {
  const station = getOrCreateStation(stationId);
  
  station.listeners.add(socket);
  station.metadata.listenerCount = station.listeners.size;
  console.log(`[Station ${stationId}] Listener connected. Total listeners: ${station.listeners.size}`);

  // Notify broadcaster of new listener count
  if (station.broadcaster && station.broadcaster.readyState === WebSocket.OPEN) {
    station.broadcaster.send(JSON.stringify({
      type: 'listener_count_update',
      listenerCount: station.listeners.size,
    }));
  }

  // Send initial status to listener
  socket.send(JSON.stringify({
    type: 'listener_connected',
    stationId,
    isLive: station.broadcaster !== null && station.broadcaster.readyState === WebSocket.OPEN,
    stationName: station.metadata.stationName,
    startedAt: station.metadata.startedAt,
  }));

  socket.onclose = () => {
    station.listeners.delete(socket);
    station.metadata.listenerCount = station.listeners.size;
    console.log(`[Station ${stationId}] Listener disconnected. Total listeners: ${station.listeners.size}`);

    // Notify broadcaster of updated listener count
    if (station.broadcaster && station.broadcaster.readyState === WebSocket.OPEN) {
      station.broadcaster.send(JSON.stringify({
        type: 'listener_count_update',
        listenerCount: station.listeners.size,
      }));
    }

    // Clean up empty stations
    if (station.listeners.size === 0 && !station.broadcaster) {
      stations.delete(stationId);
      console.log(`[Station ${stationId}] Station removed (no connections)`);
    }
  };

  socket.onerror = (error) => {
    console.error(`[Station ${stationId}] Listener error:`, error);
  };
};

serve(async (req) => {
  const url = new URL(req.url);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle status endpoint
  if (url.pathname.endsWith('/status')) {
    const stationId = url.searchParams.get('stationId');
    
    if (stationId) {
      const station = stations.get(stationId);
      return new Response(JSON.stringify({
        stationId,
        isLive: station?.broadcaster !== null && station?.broadcaster?.readyState === WebSocket.OPEN,
        listenerCount: station?.listeners.size || 0,
        stationName: station?.metadata.stationName || 'Unknown',
        startedAt: station?.metadata.startedAt || null,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Return all stations status
    const allStations = Array.from(stations.entries()).map(([id, station]) => ({
      stationId: id,
      isLive: station.broadcaster !== null && station.broadcaster.readyState === WebSocket.OPEN,
      listenerCount: station.listeners.size,
      stationName: station.metadata.stationName,
      startedAt: station.metadata.startedAt,
    }));

    return new Response(JSON.stringify({ stations: allStations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Check for WebSocket upgrade
  const upgradeHeader = req.headers.get("upgrade") || "";
  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response(JSON.stringify({ 
      error: "Expected WebSocket connection",
      usage: {
        broadcaster: "Connect with ?role=broadcaster&stationId=xxx&stationName=xxx",
        listener: "Connect with ?role=listener&stationId=xxx",
        status: "GET /status?stationId=xxx for station status",
      }
    }), { 
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const role = url.searchParams.get('role');
  const stationId = url.searchParams.get('stationId');
  const stationName = url.searchParams.get('stationName') || 'My Station';

  if (!stationId) {
    return new Response(JSON.stringify({ error: "stationId is required" }), { 
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!role || !['broadcaster', 'listener'].includes(role)) {
    return new Response(JSON.stringify({ error: "role must be 'broadcaster' or 'listener'" }), { 
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { socket, response } = Deno.upgradeWebSocket(req);

    if (role === 'broadcaster') {
      handleBroadcaster(socket, stationId, stationName);
    } else {
      handleListener(socket, stationId);
    }

    return response;
  } catch (error) {
    console.error("WebSocket upgrade error:", error);
    return new Response(JSON.stringify({ error: "Failed to upgrade connection" }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
