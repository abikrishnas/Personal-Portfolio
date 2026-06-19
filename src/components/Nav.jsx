import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { to: '/work',    label: 'Work'    },
  { to: '/about',   label: 'About'   },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── FLOATING HEADER BAR ── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: isLight ? 'rgba(240, 236, 228, 0.65)' : 'rgba(12, 12, 12, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--c-border)',
          transition: 'background-color 0.75s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.45s ease',
        }}
      >
        <div 
          className="px-5 md:px-10"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            width: '100%',
            height: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >

          {/* ── LOGO ── */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            style={{
              pointerEvents: 'auto',
              fontFamily: '"DM Serif Display", serif',
              fontSize: '1.1875rem',
              letterSpacing: '-0.01em',
              color: (menuOpen || !isLight) ? '#f0ece4' : '#0f0e0d',
              textDecoration: 'none',
              transition: 'color 0.4s ease',
            }}
          >
            Abikrishna. S
          </Link>

          {/* ── CENTER PILL — desktop only ── */}
          {!isMobile && (
            <nav
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.125rem',
                background: 'rgba(16, 15, 12, 0.45)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '999px',
                padding: '0.375rem',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={{ textDecoration: 'none', position: 'relative' }}
                >
                  {({ isActive }) => (
                    <span style={{ position: 'relative', display: 'block', borderRadius: '999px', overflow: 'hidden' }}>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '999px',
                            background: 'rgba(240,236,228,0.1)',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                      <span
                        style={{
                          display: 'block',
                          position: 'relative',
                          zIndex: 1,
                          padding: '0.5625rem 1.25rem',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 400,
                          letterSpacing: '0.005em',
                          color: isActive
                            ? 'rgba(240,236,228,0.95)'
                            : 'rgba(240,236,228,0.42)',
                          transition: 'color 0.18s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) e.currentTarget.style.color = 'rgba(240,236,228,0.72)';
                        }}
                        onMouseLeave={e => {
                          if (!isActive) e.currentTarget.style.color = 'rgba(240,236,228,0.42)';
                        }}
                      >
                        {label}
                      </span>
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          )}

          {/* ── RIGHT SIDE ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto' }}>
            {!isMobile && (
              <a
                href="/mockup-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '999px',
                  padding: '0.625rem 1.25rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  background: 'rgba(16, 15, 12, 0.45)',
                  color: 'rgba(240,236,228,0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Download ME
              </a>
            )}

            {/* Hamburger — mobile */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px',
                  width: '44px', height: '44px',
                  alignItems: 'center',
                  background: 'rgba(16, 15, 12, 0.45)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '999px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    animate={
                      i === 0 ? { rotate: menuOpen ? 45  : 0, y: menuOpen ? 6  : 0 }
                    : i === 1 ? { opacity: menuOpen ? 0  : 1                        }
                    :            { rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }
                    }
                    style={{ display: 'block', width: '18px', height: '1px', background: '#f0ece4', transformOrigin: 'center' }}
                  />
                ))}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(12,12,12,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 2.5rem',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: i * 0.07, duration: 0.28 }}
                >
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      fontFamily: '"DM Serif Display", serif',
                      fontSize: 'clamp(2.75rem, 9vw, 5rem)',
                      color: isActive ? '#f0ece4' : 'rgba(240,236,228,0.25)',
                      textDecoration: 'none',
                      lineHeight: 1.2,
                      paddingBlock: '0.2rem',
                      transition: 'color 0.18s',
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              style={{ marginTop: '2.5rem' }}
            >
              <a
                href="/mockup-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'rgba(240,236,228,0.07)',
                  color: '#f0ece4',
                  borderRadius: '999px',
                  padding: '0.875rem 1.75rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8125rem', fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid rgba(240,236,228,0.08)',
                }}
              >
                Download ME
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
