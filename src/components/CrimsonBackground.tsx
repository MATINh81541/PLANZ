import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
  { color: 'rgba(220, 60, 100, 0.28)', size: 700, x: '-10%', y: '-5%', duration: 28, delay: 0, blur: 90 },
  { color: 'rgba(180, 40, 80, 0.18)', size: 550, x: '60%', y: '8%', duration: 32, delay: 3, blur: 80 },
  { color: 'rgba(240, 130, 170, 0.2)', size: 450, x: '20%', y: '50%', duration: 26, delay: 6, blur: 70 },
  { color: 'rgba(200, 50, 90, 0.15)', size: 600, x: '65%', y: '55%', duration: 30, delay: 1.5, blur: 85 },
  { color: 'rgba(255, 200, 220, 0.25)', size: 380, x: '35%', y: '18%', duration: 24, delay: 4, blur: 60 },
];

export default function CrimsonBackground() {
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
            const factor = (i % 2 === 0 ? 1 : -1) * (10 + i * 4);
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
      style={{ background: 'linear-gradient(180deg, #fdf2f5 0%, #fce8ed 25%, #f9dde6 50%, #fbd0dc 75%, #fce8ed 100%)' }}
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
    </div>
  );
}
