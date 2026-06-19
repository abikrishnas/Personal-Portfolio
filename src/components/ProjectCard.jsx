import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
    >
      <Link
        to={`/work/${project.slug}`}
        data-cursor="card"
        style={{ display: 'block', textDecoration: 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="theme-surface"
          style={{
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid var(--c-border)',
            transition: 'border-color 0.45s ease',
          }}
        >
          {/* Image area */}
          <div style={{ position: 'relative', overflow: 'hidden', height: '260px' }}>
            <motion.img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Hover overlay */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(12,12,12,0.52)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.5rem',
              }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,236,228,0.65)', marginBottom: '0.35rem' }}>
                  {project.category}
                </p>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.25rem', color: '#f0ece4' }}>
                  {project.title}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom strip */}
          <motion.div
            style={{ padding: '1.125rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.0625rem', color: 'var(--c-primary)', marginBottom: '0.2rem', transition: 'color 0.45s ease' }}>
                {project.title}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--c-muted)', letterSpacing: '0.04em', transition: 'color 0.45s ease' }}>
                {project.category}
              </p>
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--c-muted)', fontVariantNumeric: 'tabular-nums', transition: 'color 0.45s ease' }}>
              {project.year}
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
