import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type BlobConfig = {
  color: string;
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  blur: number;
};

const blobs: BlobConfig[] = [
  { color: 'rgba(217, 255, 106, 0.4)', size: 750, x: '-12%', y: '-8%', duration: 28, delay: 0, blur: 90 },
  { color: 'rgba(207, 249, 138, 0.3)', size: 600, x: '55%', y: '5%', duration: 32, delay: 3, blur: 80 },
  { color: 'rgba(221, 252, 235, 0.35)', size: 500, x: '15%', y: '50%', duration: 26, delay: 6, blur: 70 },
  { color: 'rgba(217, 255, 106, 0.22)', size: 650, x: '65%', y: '55%', duration: 30, delay: 1.5, blur: 85 },
  { color: 'rgba(240, 255, 228, 0.5)', size: 400, x: '35%', y: '20%', duration: 24, delay: 4, blur: 60 },
  { color: 'rgba(207, 249, 138, 0.18)', size: 550, x: '-5%', y: '65%', duration: 34, delay: 2, blur: 75 },
];

export default function LiquidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mousePos.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };

      if (containerRef.current && !rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          const blobEls = containerRef.current?.querySelectorAll<HTMLDivElement>('[data-blob]');
          blobEls?.forEach((blob, i) => {
            const factor = (i % 2 === 0 ? 1 : -1) * (12 + i * 4);
            blob.style.transform = `translate(${mousePos.current.x * factor}px, ${mousePos.current.y * factor}px)`;
          });
        });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          data-blob
          className="absolute rounded-full will-change-transform"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
            filter: `blur(${blob.blur}px)`,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -25, 15, 0],
                  scale: [1, 1.08, 0.95, 1],
                }
          }
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#e8f7cc]/40" />
    </div>
  );
}
