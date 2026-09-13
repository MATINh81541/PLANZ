import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'glass';
  className?: string;
};

export default function Button({ children, href, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const reduceMotion = useReducedMotion();

  const baseClasses =
    'inline-flex items-center justify-center rounded-full font-semibold text-sm px-6 py-3 transition-all duration-300 select-none cursor-pointer';

  const variantClasses =
    variant === 'primary'
      ? 'bg-neon text-ink shadow-[0_4px_20px_rgba(217,255,106,0.3)] hover:shadow-[0_6px_28px_rgba(217,255,106,0.45)]'
      : 'glass-lime text-ink hover:bg-neon/15';

  const motionProps = reduceMotion
    ? { initial: {}, animate: {}, whileHover: {}, whileTap: {} }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        whileHover: { scale: 1.03, y: -2 },
        whileTap: { scale: 0.97 },
      };

  if (onClick) {
    return (
      <motion.button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...motionProps}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href ?? '#'}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...motionProps}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}
