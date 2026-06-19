import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { ScrollAnimatedHeading } from '../components/AnimatedHeading';
import MarqueeDivider from '../components/MarqueeDivider';
import { useTheme } from '../context/ThemeContext';

const skills = {
  Services: [
    { name: 'UI Design', detail: 'Figma-native, pixel-precise, component-driven UI for web and mobile products.' },
    { name: 'UX Research', detail: 'User interviews, usability testing, journey mapping, and synthesis.' },
    { name: 'Brand Identity', detail: 'Logo systems, typography, color, and brand guidelines that scale.' },
    { name: 'Design Systems', detail: 'Token-based systems with Figma Variables, documented for engineering.' },
    { name: 'Prototyping', detail: 'High-fidelity interactive prototypes for stakeholder alignment and testing.' },
    { name: 'Visual Design', detail: 'Crafting clean, engaging, and aesthetically pleasing interfaces with a focus on typography, color, layout, and visual hierarchy to create memorable user experiences.' },
    { name: 'Frontend Development', detail: 'Building responsive, interactive, and user-friendly web experiences using modern frameworks and clean, efficient code.' },
  ],
};

const experience = [
  {
    company: 'FOODO.AI',
    role: 'Junior UX Designer',
    years: '01/2026 – Present ',
    desc: 'Contributed to creating user-friendly digital experiences through user research, wireframing, prototyping, and usability improvements, ensuring designs align with both user needs and business goals.',
  },
  {
    company: 'TiGRID Technologies',
    role: 'UI/UX Design Intern',
    years: '09/2025 – 01/2026',
    desc: 'Assisted in designing user-centered digital experiences by creating wireframes, prototypes, and intuitive interfaces while collaborating with teams to improve usability and user satisfaction.',
  },
  {
    company: 'µlearn Foundation',
    role: 'Junior Associate, Design',
    years: '12/2024 – 07/2025',
    desc: 'Contributed to design projects by creating visual assets, supporting branding initiatives, and collaborating with teams to deliver user-focused and impactful design solutions.',
  },
  {
    company: 'µlearn Foundation',
    role: 'UI/UX Intrest Group Lead',
    years: '08/2024 – 11/2024',
    desc: 'Led a community of aspiring designers by organizing learning sessions, mentoring members, facilitating design discussions, and promoting user-centered design practices through collaborative projects and activities.',
  },
  {
    company: 'µlearn Foundation',
    role: 'Graphic Designer Intern',
    years: '06/2024 – 12/2024',
    desc: 'Created visual designs for digital and print media, assisting in branding, social media creatives, marketing materials.',
  },
];

function SkillAccordion({ skills: skillList }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {skillList.map((skill, i) => (
        <div
          key={skill.name}
          style={{ borderBottom: '1px solid rgba(240,236,228,0.08)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.125rem 0',
              background: 'none',
              border: 'none',
              textAlign: 'left',
            }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--c-primary)', fontWeight: 400 }}>
              {skill.name}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ color: 'var(--c-muted)', fontSize: '1.25rem', lineHeight: 1, display: 'inline-block' }}
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--c-muted)', lineHeight: 1.7, paddingBottom: '1.25rem' }}>
                  {skill.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const { setTheme } = useTheme();
  const skillsRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (window.location.pathname !== '/about') return;
    if (!skillsRef.current) return;
    const rect = skillsRef.current.getBoundingClientRect();
    const triggerScrollY = latest + rect.top;
    const threshold = triggerScrollY - window.innerHeight * 0.65;
    if (latest >= threshold) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });

  return (
    <PageTransition>
      <div className="page-container">
        {/* ── PAGE HERO ── */}
        <div className="hero-spacing">
          <ScrollAnimatedHeading
            text={['Designer.', 'Vibecoder.', 'Problem Solver.']}
            tag="h1"
            style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: 'var(--c-primary)',
              lineHeight: 1.05,
            }}
          />
        </div>

        {/* ── INTRO 2-COL ── */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 pb-16 md:pb-24" style={{ alignItems: 'start', borderBottom: '1px solid var(--c-border)' }}>
          {/* Portrait */}
          <ScrollReveal>
            <div style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', aspectRatio: '3/4', background: '#111111' }}>
              <img
                src="/images/Profile Pic.jpg"
                alt="Workspace"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div>
            <ScrollReveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1875rem', color: 'var(--c-primary)', lineHeight: 1.8, marginBottom: '1.75rem', fontWeight: 400 }}>
                I'm Abikrishna. S, a Digital Product Designer and Vibe Coder based in Thiruvananthapuram, India. I've spent the last 3+ years at the intersection of design and engineering, building products that feel as good as they function.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: 'var(--c-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                My approach is rooted in clarity. Before I open a design tool, I try to understand the problem completely. Good design decisions come from good questions, about users, about constraints, about what success actually looks like.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: 'var(--c-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
                I work best as a bridge between disciplines, comfortable in Figma and in a code editor, able to speak to both designers and engineers with equal fluency. I believe this hybrid perspective leads to better outcomes.
              </p>
            </ScrollReveal>

            {/* Details strip */}
            <ScrollReveal delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { label: 'Based in', value: 'Thiruvananthapuram, IN' },
                  { label: 'Experience', value: '3+ Years' },
                  { label: 'Available for', value: 'Freelance & Full-time' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBlock: '1rem', borderBottom: '1px solid var(--c-border)' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--c-primary)' }}>{value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section ref={skillsRef} className="section-spacing">
          <ScrollReveal>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '3.5rem' }}>
              Skills & Tools
            </p>
          </ScrollReveal>
          <div>
            {Object.entries(skills).map(([group, list], gi) => (
              <ScrollReveal key={group} delay={gi * 0.1}>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.25rem', color: 'var(--c-primary)', marginBottom: '1.5rem' }}>{group}</p>
                <SkillAccordion skills={list} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="section-spacing" style={{ borderTop: '1px solid var(--c-border)' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '3.5rem' }}>
              Experience
            </p>
          </ScrollReveal>
          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid var(--c-border)' }}>
            {experience.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div style={{ marginBottom: '3.5rem', position: 'relative' }}>
                  {/* dot */}
                  <div style={{ position: 'absolute', left: '-2.375rem', top: '0.4rem', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-border)', border: '1px solid var(--c-muted)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.25rem', color: 'var(--c-primary)' }}>{exp.company}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--c-muted)', marginTop: '0.2rem' }}>{exp.role}</p>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--c-muted)', fontVariantNumeric: 'tabular-nums', paddingTop: '0.3rem' }}>{exp.years}</p>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--c-muted)', lineHeight: 1.7 }}>{exp.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* ── VALUES MARQUEE ── */}
      <MarqueeDivider items={['Clarity', 'Precision', 'Intention', 'Craft', 'Detail', 'Curiosity']} speed={14} />

      {/* ── CLOSING CTA ── */}
      <div style={{ padding: '8rem 2.5rem', textAlign: 'center' }}>
        <ScrollReveal>
          <div style={{ marginBottom: '1.5rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--c-primary)', lineHeight: 1.15 }}
            >
              Interested in working together?
            </motion.h2>
          </div>
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
              marginTop: '1.5rem',
            }}
          >
            Get in touch
          </Link>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
