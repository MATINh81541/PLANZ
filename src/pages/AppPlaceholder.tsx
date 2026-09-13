import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function AppPlaceholder() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="w-8 h-8 rounded-full border-2 border-neon/30 border-t-neon animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="w-full max-w-lg"
      >
        <div className="glass-lime glass-shadow-lime rounded-5xl p-10 md:p-14 flex flex-col items-center text-center">
          <h1 className="font-planz text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-4" style={{ direction: 'ltr' }}>
            PLANZ
          </h1>
          <p className="text-xl md:text-2xl font-bold text-ink mb-2">
            خوش آمدی.
          </p>
          <p className="text-base md:text-lg text-ink-secondary font-medium max-w-sm leading-[2]">
            تو اکنون داخل فضای کاری PLANZ خود هستی.
          </p>
          <p className="text-sm text-ink-secondary/70 font-medium mt-4 leading-[2]">
            این یک پایه موقت برای داشبورد آینده برنامه‌ریز است.
          </p>

          {user && (
            <p className="mt-5 text-sm text-ink-secondary/60 font-medium ltr-input">
              {user.email}
            </p>
          )}

          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center rounded-full bg-neon text-ink font-semibold text-sm px-5 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_4px_20px_rgba(217,255,106,0.3)]"
            >
              <LogOut size={16} className="ml-2" strokeWidth={2.5} />
              خروج
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center rounded-full glass-float-lime text-ink font-semibold text-sm px-5 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <ArrowRight size={16} className="ml-2" strokeWidth={2.5} />
              بازگشت به خانه
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
