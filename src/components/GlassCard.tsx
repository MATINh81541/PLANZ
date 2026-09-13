import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  floatDelay?: number;
  intensity?: 'primary' | 'float' | 'lime';
};

export default function GlassCard({
  children,
  className = '',
  floatDelay = 0,
  intensity = 'primary',
}: GlassCardProps) {
  const reduceMotion = useReducedMotion();

  const glassClass =
    intensity === 'primary'
      ? 'glass-primary glass-shadow'
      : intensity === 'lime'
        ? 'glass-lime glass-shadow-lime'
        : 'glass-float';

  return (
    <motion.div
      className={`rounded-4xl ${glassClass} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -8, 0],
            }
      }
      transition={{
        duration: 5,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
