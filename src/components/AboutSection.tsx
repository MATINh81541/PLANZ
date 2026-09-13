import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from './GlassCard';

const principles = ['ساده', 'متمرکز', 'انعطاف‌پذیر'];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();

  const sectionVariants = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
      };

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
        },
      };

  const words = 'برنامه‌ریزی باید سبک‌تر باشد.'.split(' ');

  return (
    <section id="about" className="relative py-32 md:py-48 px-4">
      {/* Soft lime atmosphere continuing from hero */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[400px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(217,255,106,0.08) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(217,255,106,0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariants}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-ink-secondary/70 mb-6"
          >
            درباره PLANZ
          </motion.span>

          <h2 className="text-balance text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.25]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className="inline-block ml-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            variants={itemVariants}
            className="text-balance text-lg md:text-xl text-ink-secondary font-medium leading-[2] mt-8 max-w-2xl"
          >
            PLANZ بر یک ایده ساده بنا شده: برنامه‌ریزی باید ذهنت را آزاد کند، نه درگیرش کند. فضایی آرام و متمرکز برای همه چیزهایی که می‌خواهی انجام دهی — با همان اندازه ساختاری که نیاز داری.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionVariants}
          className="flex flex-wrap gap-3 md:gap-4 mt-14"
        >
          {principles.map((p, i) => (
            <motion.div key={p} variants={itemVariants}>
              <GlassCard
                floatDelay={i * 0.8}
                intensity="lime"
                className="px-6 py-4"
              >
                <span className="text-base md:text-lg font-bold text-ink">{p}</span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute left-[5%] top-[30%] w-32 h-32 rounded-full glass-float-lime hidden lg:block"
        aria-hidden="true"
      />
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        className="absolute right-[8%] bottom-[15%] w-20 h-20 rounded-full border-2 border-neon/40 hidden lg:block"
        aria-hidden="true"
      />
    </section>
  );
}
