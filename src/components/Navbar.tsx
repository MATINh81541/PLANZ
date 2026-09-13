import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'درباره ما', type: 'anchor' as const, href: '#about' },
  { label: 'ویژگی‌ها', type: 'anchor' as const, href: '#features' },
  { label: 'قیمت‌ها', type: 'route' as const, href: '/pricing' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (link: { type: 'anchor' | 'route'; href: string }) => {
    setMenuOpen(false);
    if (link.type === 'route') {
      navigate(link.href);
    } else {
      if (!isHome) {
        navigate('/');
        setTimeout(() => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleGetStarted = () => {
    setMenuOpen(false);
    navigate('/get-started');
  };

  const navVariants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: -24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={navVariants.initial}
          animate={navVariants.animate}
          transition={{ type: 'spring' as const, stiffness: 120, damping: 20, delay: 0.2 }}
          className="pointer-events-auto"
          style={{ maxWidth: 'calc(100vw - 2rem)' }}
        >
          <div
            className={`glass-primary rounded-full flex items-center justify-between gap-4 pr-6 pl-2.5 h-16 md:h-[68px] transition-all duration-500 ${
              scrolled ? 'shadow-[0_8px_32px_rgba(120,160,80,0.14)]' : ''
            }`}
          >
            {/* PLANZ brand — always LTR */}
            <button
              onClick={() => navigate('/')}
              className="font-planz text-lg font-extrabold tracking-tight text-ink select-none whitespace-nowrap"
              style={{ direction: 'ltr' }}
            >
              PLANZ
            </button>

            <div className="hidden md:flex items-center gap-1 flex-row-reverse">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="px-3.5 py-2 text-sm font-medium text-ink-secondary hover:text-ink transition-colors duration-300 rounded-full hover:bg-white/30"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={handleGetStarted}
                className="mr-1.5 inline-flex items-center rounded-full bg-neon/90 hover:bg-neon px-4 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_2px_12px_rgba(217,255,106,0.35)]"
              >
                شروع کنید
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full glass-float-lime text-ink shrink-0"
              aria-label="باز کردن منو"
            >
              <Menu size={18} strokeWidth={2.5} />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/10 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              transition={{ type: 'spring' as const, stiffness: 200, damping: 25 }}
              className="absolute top-6 left-4 right-4 glass-primary rounded-3xl p-5 flex flex-col gap-1"
            >
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full glass-float-lime text-ink"
                  aria-label="بستن منو"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
                <span className="font-planz text-lg font-extrabold tracking-tight text-ink" style={{ direction: 'ltr' }}>
                  PLANZ
                </span>
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="px-4 py-3 text-right text-base font-medium text-ink-secondary hover:text-ink hover:bg-neon/10 rounded-2xl transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={handleGetStarted}
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-neon px-4 py-3 text-base font-semibold text-ink transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_2px_16px_rgba(217,255,106,0.4)]"
              >
                شروع کنید
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
