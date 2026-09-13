import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative py-24 md:py-32 px-4">
      {/* Lime atmosphere behind footer */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[800px] aspect-[2/1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217,255,106,0.1) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={reduceMotion ? {} : { opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-3xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.4]"
        >
          آماده‌ای برای جایی که اهمیت دارد وقت بگذاری؟
        </motion.h2>

        <motion.button
          onClick={() => navigate('/get-started')}
          initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="inline-flex items-center justify-center rounded-full bg-neon text-ink font-semibold text-base px-8 py-4 mt-10 shadow-[0_4px_24px_rgba(217,255,106,0.4)] hover:shadow-[0_8px_36px_rgba(217,255,106,0.55)] transition-shadow duration-300"
        >
          شروع برنامه‌ریزی
        </motion.button>

        <div className="mt-20 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-secondary/50 font-medium">
            © ۱۴۰۵ PLANZ
          </p>
          <p className="text-sm text-ink-secondary/70 font-medium">
            بهتر برنامه‌ریزی کن. سبک‌تر زندگی کن.
          </p>
          <span className="font-planz text-lg font-extrabold tracking-tight text-ink" style={{ direction: 'ltr' }}>
            PLANZ
          </span>
        </div>
      </div>
    </footer>
  );
}
