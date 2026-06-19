import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { ScrollAnimatedHeading } from '../components/AnimatedHeading';
import { projects } from '../data/projects';
import { useTheme } from '../context/ThemeContext';

const FILTERS = ['All', 'Web - UI Design', 'Mobile App UI Design'];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="page-container">
        {/* ── PAGE HEADER ── */}
        <div className="hero-spacing" style={{ borderBottom: '1px solid var(--c-border)' }}>
          <ScrollAnimatedHeading
            text={['Selected Work']}
            tag="h1"
            style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: 'var(--c-primary)',
              lineHeight: 1.05,
              marginBottom: '1.75rem',
            }}
          />
          <ScrollReveal delay={0.15}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: 'var(--c-muted)', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2rem' }}>
              A curated selection of projects across design and development.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>
              {projects.length} Projects Delivered
            </p>
          </ScrollReveal>
        </div>

        {/* ── FILTER BAR ── */}
        <ScrollReveal>
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                  padding: '0.5rem 1.125rem',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: activeFilter === f ? 'var(--c-primary)' : 'var(--c-border)',
                  background: activeFilter === f ? 'var(--c-primary)' : 'transparent',
                  color: activeFilter === f ? 'var(--c-bg)' : 'var(--c-muted)',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── PROJECT GRID ── */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
            paddingBottom: '5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              >
                <WorkCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ borderTop: '1px solid var(--c-border)', padding: '6rem 2.5rem', textAlign: 'center' }}>
        <ScrollReveal>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--c-primary)', marginBottom: '1.5rem' }}>
            Let's build something together
          </h2>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
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
            }}
          >
            Get in touch
          </Link>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}

function WorkCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="card"
      style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="theme-surface theme-border"
        style={{
          borderRadius: '2px',
          overflow: 'hidden',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '62%' }}>
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <motion.div
          style={{ padding: '1.25rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.125rem', color: 'var(--c-primary)', marginBottom: '0.3rem' }}>
              {project.title}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: hovered ? 'var(--c-primary)' : 'var(--c-muted)', letterSpacing: '0.04em', transition: 'color 0.2s' }}>
              {project.category}
            </p>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--c-muted)', fontVariantNumeric: 'tabular-nums' }}>
            {project.year}
          </span>
        </motion.div>
      </div>
    </Link>
  );
}
