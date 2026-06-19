import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import MarqueeDivider from '../components/MarqueeDivider';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedHeading from '../components/AnimatedHeading';
import { projects } from '../data/projects';
import { useTheme } from '../context/ThemeContext';

// ── Testimonials ──────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    quote: "Working with Abi was one of the best design decisions we made. The attention to detail and ability to translate complex requirements into elegant UI was exceptional.",
    name: "Lipin",
    role: "CTO, Silvalet",
  },
  {
    id: 2,
    quote: "Beyond the craft, what set Abi apart was the clarity of thinking. Every decision was intentional and explained no guesswork.",
    name: "Anil Antony",
    role: "Founder, PulseFrame Studios",
  },
  {
    id: 3,
    quote: "Abi is a talented individual who brings value to every project and is a pleasure to work with.",
    name: "Muhammed R",
    role: "Founder, Pulsetap",
  },
];

function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(v => (v + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="page-container section-spacing">
      <ScrollReveal>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '3rem', transition: 'color 0.45s ease' }}>
          What people say
        </p>
      </ScrollReveal>

      <div style={{ position: 'relative', minHeight: '200px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ maxWidth: '720px' }}>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: 'var(--c-primary)', lineHeight: 1.55, marginBottom: '2rem', fontStyle: 'italic', transition: 'color 0.45s ease' }}>
                "{testimonials[active].quote}"
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--c-primary)', fontWeight: 500, transition: 'color 0.45s ease' }}>
                {testimonials[active].name}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--c-muted)', marginTop: '0.2rem', transition: 'color 0.45s ease' }}>
                {testimonials[active].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? '2rem' : '0.5rem',
              height: '2px',
              borderRadius: '1px',
              background: i === active ? 'var(--c-primary)' : 'var(--c-border)',
              border: 'none',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────
export default function Home() {
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const { setTheme } = useTheme();

  // Ref on the dark-section trigger (About Teaser)
  const darkTriggerRef = useRef(null);
  const { scrollY } = useScroll();

  // Set light mode when Home mounts
  useEffect(() => {
    setTheme('light');
    return () => {
      // Leave theme as-is when unmounting — Layout/ScrollToTop will reset on nav
    };
  }, [setTheme]);

  // Switch dark ↔ light based on scroll position relative to the trigger element
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (window.location.pathname !== '/') return;
    if (!darkTriggerRef.current) return;
    const rect = darkTriggerRef.current.getBoundingClientRect();
    const triggerScrollY = latest + rect.top;
    // Switch to dark 80px before the section reaches the viewport center
    const threshold = triggerScrollY - window.innerHeight * 0.65;
    if (latest >= threshold) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });

  return (
    <PageTransition>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="page-container"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Status label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}
        >
          <span
            className="status-dot"
            style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }}
          />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', transition: 'color 0.45s ease' }}>
            Designer & Vibe Coder · Open to work
          </p>
        </motion.div>

        {/* Hero headline */}
        <AnimatedHeading
          text={['Crafting digital', 'experiences with', 'precision.']}
          tag="h1"
          delay={0.3}
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(3.25rem, 8vw, 7rem)',
            lineHeight: 1.05,
            color: 'var(--c-primary)',
            marginBottom: '2rem',
            letterSpacing: '-0.01em',
            transition: 'color 0.45s ease',
          }}
        />

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: 'var(--c-muted)', maxWidth: '480px', lineHeight: 1.7, transition: 'color 0.45s ease' }}
        >
          I design and build products where every detail is considered and nothing is accidental.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', transition: 'color 0.45s ease' }}>
            Scroll
          </p>
          <motion.svg
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <path d="M7 1v12M1 7l6 6 6-6" stroke="var(--c-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

        {/* Year / location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.08em', color: 'var(--c-muted)', transition: 'color 0.45s ease' }}
        >
          © 2021 · Thiruvananthapuram, IN
        </motion.p>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────── */}
      <section className="page-container section-spacing">
        <ScrollReveal>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '3rem', transition: 'color 0.45s ease' }}>
            01 — Selected Work
          </p>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
            <Link
              to="/work"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--c-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.45s ease, gap 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.gap = '0.9rem'}
              onMouseLeave={e => e.currentTarget.style.gap = '0.5rem'}
            >
              View all work →
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── MARQUEE DIVIDER ───────────────────────────────────────── */}
      <MarqueeDivider />

      {/* ── ABOUT TEASER — this is the dark-mode trigger ──────────── */}
      <section
        ref={darkTriggerRef}
        className="page-container section-spacing"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16" style={{ alignItems: 'start' }}>
          <div>
            <ScrollReveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '2rem', transition: 'color 0.45s ease' }}>
                02 — About
              </p>
            </ScrollReveal>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--c-primary)', lineHeight: 1.35, marginBottom: '1.5rem', transition: 'color 0.45s ease' }}
              >
                I'm a designer and vibe coder who believes the best work happens at the intersection of craft and code.
              </motion.p>
            </div>
            <ScrollReveal delay={0.15}>
              <Link
                to="/about"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--c-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.45s ease, gap 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.gap = '0.9rem'}
                onMouseLeave={e => e.currentTarget.style.gap = '0.5rem'}
              >
                Know more about me →
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', paddingTop: '4rem' }}>
              {[
                { label: 'Experience', value: '3+ Years of Internship, Freelancing & Professional Work' },
                { label: 'Projects', value: '60+ Delivered' },
                { label: 'Based in', value: 'Thiruvananthapuram, IN' },
                { label: 'Currently', value: 'Available for oppurtunities' },
              ].map(({ label, value }) => (
                <div key={label} style={{ borderTop: '1px solid var(--c-border)', paddingTop: '1.25rem', paddingBottom: '1.25rem', transition: 'border-color 0.45s ease' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '0.4rem', transition: 'color 0.45s ease' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--c-primary)', transition: 'color 0.45s ease' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--c-border)', transition: 'border-color 0.45s ease' }}>
        <TestimonialCarousel />
      </div>

      {/* ── CLOSING CTA ───────────────────────────────────────────── */}
      <section
        className="page-container section-spacing"
        style={{
          textAlign: 'center',
          borderTop: '1px solid var(--c-border)',
        }}
      >
        <ScrollReveal>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '2rem', transition: 'color 0.45s ease' }}>
            Let's collaborate
          </p>
        </ScrollReveal>
        <div style={{ marginBottom: '1.5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--c-primary)', lineHeight: 1.1, transition: 'color 0.45s ease' }}
          >
            Have a project in mind?
          </motion.h2>
        </div>
        <ScrollReveal delay={0.15}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: 'var(--c-muted)', marginBottom: '2.5rem', transition: 'color 0.45s ease' }}>
            I'm currently available for new projects. Let's make something great.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--c-pill-bg)',
              color: 'var(--c-pill-fg)',
              borderRadius: '999px',
              padding: '0.875rem 2rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.45s ease, color 0.45s ease, opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Get in touch
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
