import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ProjectCard from '../components/ProjectCard';
import { projects, getProjectBySlug } from '../data/projects';
import { useTheme } from '../context/ThemeContext';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProjects = [];
  if (currentIndex !== -1) {
    for (let i = 1; i <= 3; i++) {
      nextProjects.push(projects[(currentIndex + i) % projects.length]);
    }
  }

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [slug, setTheme]);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <PageTransition>
      {/* ── HERO IMAGE ── */}
      <div style={{ position: 'relative', height: '90vh', overflow: 'hidden', marginTop: '0' }}>
        <motion.img
          src={project.images[0]}
          alt={project.title}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(12,12,12,0.75) 0%, rgba(12,12,12,0.2) 60%, transparent 100%)' }} />

        {/* Project title overlay */}
        <div style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0 }}>
          <div className="px-5 md:px-10" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,236,228,0.6)', marginBottom: '0.75rem' }}
            >
              {project.category}
            </motion.p>
            <div style={{ display: 'flex', width: '100%' }}>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#f0ece4', lineHeight: 1.1 }}
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Engagement, Year, Services Strip & Figma CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem', width: '100%' }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{
                  display: 'flex',
                  gap: '3rem',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { label: 'Engagement', value: project.Engagement || project.location },
                  { label: 'Year', value: project.year },
                  { label: 'Services', value: project.services },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(240, 236, 228, 0.45)',
                      marginBottom: '0.35rem',
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: '#f0ece4',
                    }}>
                      {value}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.a
                href={project.figmaUrl || "https://www.figma.com"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#f0ece4',
                  borderRadius: '999px',
                  padding: '0.95rem 2rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Figma Design File</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* ── OVERVIEW ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 section-spacing" style={{ alignItems: 'start' }}>
          <ScrollReveal>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '1.5rem' }}>
                Overview
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: 'var(--c-primary)', lineHeight: 1.85 }}>
                {project.description}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '1.5rem' }}>
                The Challenge
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: 'var(--c-primary)', lineHeight: 1.85 }}>
                {project.challenge}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FULL-BLEED IMAGES ── */}
        <div className="flex flex-col gap-16 md:gap-24 mb-16 md:mb-24">
          {project.images.slice(1).map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div>
                <img
                  src={img}
                  alt={`${project.title} ${i + 2}`}
                  style={{ width: '100%', height: 'auto', maxHeight: '700px', objectFit: 'cover', borderRadius: '2px', display: 'block' }}
                />
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--c-muted)', marginTop: '0.75rem', letterSpacing: '0.04em' }}>
                  {project.title} — Visual {i + 2}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── PROCESS ── */}
        <section className="section-spacing" style={{ borderTop: '1px solid var(--c-border)' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '3rem' }}>
              Process
            </p>
          </ScrollReveal>
          <div>
            {project.process.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  className="grid grid-cols-[3rem_1fr] gap-4 md:gap-8"
                  style={{
                    paddingBlock: '2.5rem',
                    borderBottom: '1px solid var(--c-border)',
                    alignItems: 'start',
                  }}
                >
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--c-muted)', fontVariantNumeric: 'tabular-nums', paddingTop: '0.2rem' }}>
                    {step.step}
                  </p>
                  <div>
                    <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.25rem', color: 'var(--c-primary)', marginBottom: '0.75rem' }}>
                      {step.title}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--c-muted)', lineHeight: 1.7 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="section-spacing" style={{ borderTop: '1px solid var(--c-border)' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '3rem' }}>
              Results
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem' }}>
            {project.stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '1.5rem' }}>
                  <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--c-primary)', lineHeight: 1, marginBottom: '0.75rem' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--c-muted)', lineHeight: 1.5 }}>
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* ── NEXT PROJECTS ── */}
      <section className="px-5 md:px-10 section-spacing" style={{ maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid var(--c-border)' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--c-muted)',
          marginBottom: '3rem'
        }}>
          Next Projects
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {nextProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
