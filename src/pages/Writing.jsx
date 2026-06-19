import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { ScrollAnimatedHeading } from '../components/AnimatedHeading';
import { articles } from '../data/articles';

const FILTERS = ['All', 'Design', 'Development', 'Career', 'Process'];

export default function Writing() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? articles
    : articles.filter(a => a.category === activeFilter);

  return (
    <PageTransition>
      <div className="page-container">
        {/* ── PAGE HEADER ── */}
        <div className="hero-spacing" style={{ borderBottom: '1px solid rgba(240,236,228,0.08)' }}>
          <ScrollAnimatedHeading
            text={['Writing']}
            tag="h1"
            style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: '#f0ece4',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}
          />
          <ScrollReveal delay={0.1}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: '#8a8680', maxWidth: '480px', lineHeight: 1.7 }}>
              Thoughts on design, development, and the craft of building things.
            </p>
          </ScrollReveal>
        </div>

        {/* ── FILTER TAGS ── */}
        <ScrollReveal>
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', paddingTop: '2.5rem', paddingBottom: '1rem' }}>
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
                  borderColor: activeFilter === f ? '#f0ece4' : 'rgba(240,236,228,0.15)',
                  background: activeFilter === f ? '#f0ece4' : 'transparent',
                  color: activeFilter === f ? '#0c0c0c' : '#8a8680',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── ARTICLE LIST ── */}
        <div style={{ paddingBottom: '8rem' }}>
          {filtered.map((article, i) => (
            <ArticleRow key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

function ArticleRow({ article, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
    >
      <Link
        to={`/writing/${article.slug}`}
        style={{ display: 'block', textDecoration: 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-4 sm:gap-8"
          style={{
            alignItems: 'center',
            padding: '1.75rem 0.75rem',
            borderBottom: '1px solid rgba(240,236,228,0.08)',
            background: hovered ? 'rgba(240,236,228,0.025)' : 'transparent',
            transition: 'background 0.2s',
            borderRadius: '2px',
          }}
        >
          {/* Date */}
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.75rem', color: '#8a8680', letterSpacing: '0.04em', flexShrink: 0 }}>
            {article.date}
          </p>

          {/* Title */}
          <motion.p
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.1rem, 2vw, 1.375rem)', color: '#f0ece4', lineHeight: 1.3 }}
          >
            {article.title}
          </motion.p>

          {/* Category pill */}
          <span className="justify-self-start sm:justify-self-end" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#8a8680',
            border: '1px solid rgba(240,236,228,0.12)',
            borderRadius: '999px',
            padding: '0.3rem 0.875rem',
            whiteSpace: 'nowrap',
          }}>
            {article.category}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
