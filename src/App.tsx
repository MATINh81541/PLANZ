import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import LiquidBackground from '@/components/LiquidBackground';
import CrimsonBackground from '@/components/CrimsonBackground';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import GetStarted from '@/pages/GetStarted';
import AppPlaceholder from '@/pages/AppPlaceholder';
import Pricing from '@/pages/Pricing';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="w-8 h-8 rounded-full border-2 border-neon/30 border-t-neon animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/get-started" replace />;
  }

  return <>{children}</>;
}

function BackgroundSwitcher() {
  const location = useLocation();
  const isPricing = location.pathname === '/pricing';
  return isPricing ? <CrimsonBackground /> : <LiquidBackground />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-hidden">
        <BackgroundSwitcher />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppPlaceholder />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
