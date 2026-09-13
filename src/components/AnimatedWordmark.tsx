import { motion, useReducedMotion } from 'framer-motion';

const letters = ['P', 'L', 'A', 'N', 'Z'];

export default function AnimatedWordmark() {
  const reduceMotion = useReducedMotion();

  const fontSize = 'text-[clamp(4.5rem,20vw,14rem)]';

  if (reduceMotion) {
    return (
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(217,255,106,0.12) 0%, transparent 65%)',
            filter: 'blur(40px)',
            transform: 'scale(1.3)',
          }}
        />
        <h1 className={`relative font-planz font-extrabold tracking-tight text-ink leading-none select-none whitespace-nowrap ${fontSize}`}>
          PLANZ
        </h1>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217,255,106,0.15) 0%, transparent 60%)',
          filter: 'blur(50px)',
          transform: 'scale(1.4)',
        }}
      />
      <h1
        className={`relative font-planz font-extrabold tracking-tight text-ink leading-none select-none whitespace-nowrap ${fontSize}`}
        aria-label="PLANZ"
      >
        <span className="relative inline-flex lime-glow">
          {letters.map((letter, i) => (
            <motion.span
              key={letter}
              className="relative inline-block"
              initial={{ opacity: 0, scale: 1.25, y: -80, filter: 'blur(8px)' }}
              animate={{
                opacity: 1,
                scale: [1.25, 0.88, 1.05, 1],
                y: [-80, 0, 0, 0],
                filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
              }}
              transition={{
                delay: i * 0.16,
                times: [0, 0.45, 0.72, 1],
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
              <ImpactGlow delay={i * 0.16} />
            </motion.span>
          ))}
        </span>
      </h1>
    </div>
  );
}

function ImpactGlow({ delay }: { delay: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <motion.span
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: '0.7em',
        height: '0.7em',
        background: 'radial-gradient(circle, rgba(217,255,106,0.5) 0%, transparent 70%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.85, 0], scale: [0, 2.8, 4.5] }}
      transition={{ delay: delay + 0.28, duration: 0.65, ease: 'easeOut' }}
    />
  );
}
