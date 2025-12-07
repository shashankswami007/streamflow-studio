import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Studio from "./pages/Studio";
import Analytics from "./pages/Analytics";
import Guests from "./pages/Guests";
import Share from "./pages/Share";
import Stations from "./pages/Stations";
import NewStation from "./pages/NewStation";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/share" element={<Share />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/stations/new" element={<NewStation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
