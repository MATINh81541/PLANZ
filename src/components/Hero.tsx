import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimatedWordmark from './AnimatedWordmark';
import Button from './Button';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function Hero() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const handleStartPlanning = () => {
    navigate(session ? '/app' : '/get-started');
  };

  const handleLearnMore = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16"
    >
      {/* Local lime atmosphere around the wordmark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[900px] aspect-square rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(217,255,106,0.18) 0%, rgba(207,249,138,0.08) 30%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="glass-lime rounded-full px-4 py-1.5 mb-8 text-xs font-medium text-ink-secondary tracking-wide relative z-10"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon ml-2 align-middle shadow-[0_0_8px_rgba(217,255,106,0.6)]" />
        راهی تازه برای برنامه‌ریزی
      </motion.div>

      {/* PLANZ wordmark — stays English LTR */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.01, 1],
                y: [0, -4, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
        className="relative z-10"
        style={{ direction: 'ltr' }}
      >
        <AnimatedWordmark />
      </motion.div>

      <motion.p
        initial={reduceMotion ? {} : { opacity: 0, y: 16, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 1.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-balance text-center text-ink-secondary text-lg md:text-xl lg:text-2xl font-semibold mt-8 max-w-md relative z-10"
      >
        بهتر برنامه‌ریزی کن، سبک‌تر زندگی کن.
      </motion.p>

      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex items-center gap-3 mt-10 relative z-10"
      >
        <Button onClick={handleStartPlanning} variant="primary">
          شروع برنامه‌ریزی
        </Button>
        <Button onClick={handleLearnMore} variant="glass">
          بیشتر بدانید
        </Button>
      </motion.div>

      <motion.div
        initial={reduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-ink-secondary/60 font-medium tracking-wide">اسکرول</span>
        <div className="w-px h-10 bg-gradient-to-b from-ink-secondary/30 to-transparent" />
      </motion.div>
    </section>
  );
}
