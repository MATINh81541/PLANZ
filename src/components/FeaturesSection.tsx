import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Layers, Feather } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'برنامه‌ریزی هوشمند',
    description: 'همه کارها و برنامه‌هایت را در یک فضای منظم مدیریت کن.',
  },
  {
    icon: Layers,
    title: 'سازمان‌دهی ساده',
    description: 'روزها، هفته‌ها و هدف‌هایت را به روشی که دوست داری مرتب کن.',
  },
  {
    icon: Feather,
    title: 'تجربه‌ای سبک',
    description: 'PLANZ کمک می‌کند بدون شلوغی و پیچیدگی، روی کارهای مهم تمرکز کنی.',
  },
];

export default function FeaturesSection() {
  const reduceMotion = useReducedMotion();

  const sectionVariants = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

  return (
    <section id="features" className="relative py-32 md:py-48 px-4">
      <div
        className="absolute top-[10%] right-[8%] w-[350px] h-[350px] rounded-full pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(217,255,106,0.1) 0%, transparent 60%)',
          filter: 'blur(55px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
            ویژگی‌ها
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-balance text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.25] mb-6"
          >
            همه چیز برای برنامه‌ریزی بهتر.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-balance text-lg md:text-xl text-ink-secondary font-medium leading-[2] max-w-2xl mb-16"
          >
            ابزاری آرام و متمرکز، طراحی‌شده برای روشی که واقعاً کار می‌کنی — بدون شلوغی، بدون پیچیدگی.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
              className="glass-lime glass-shadow-lime rounded-4xl p-7 md:p-8"
            >
              <div className="w-11 h-11 rounded-2xl bg-neon/20 flex items-center justify-center mb-5">
                <feature.icon size={20} strokeWidth={2.2} className="text-ink" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-ink mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-ink-secondary font-medium leading-[2]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
