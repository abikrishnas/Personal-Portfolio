import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { ScrollAnimatedHeading } from '../components/AnimatedHeading';

const contactLinks = [
  { label: 'Email', buttonText: 'Send Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=abikrishna.prof@gmail.com' },
  { label: 'LinkedIn', buttonText: 'Connect', href: 'https://www.linkedin.com/in/abikrishna-s' },
  { label: 'WhatsApp', buttonText: 'Chat', href: 'https://wa.me/918606313088' },
  { label: 'Instagram', buttonText: 'Follow', href: 'https://www.instagram.com/just__.abi' },
];

function FloatingField({ id, label, type = 'text', isTextarea = false, value, onChange }) {
  const hasValue = value.length > 0;

  return (
    <div className={`floating-label-group ${hasValue ? 'has-value' : ''}`} style={{ paddingTop: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(240,236,228,0.15)', marginBottom: '0.25rem' }}>
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={5}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#f0ece4',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            resize: 'none',
            paddingTop: '1.25rem',
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#f0ece4',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.25rem',
          }}
        />
      )}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData(v => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="page-container">
        {/* ── AVAILABILITY STRIP ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-24 md:pt-36"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '4rem' }}
        >
          <span className="status-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', letterSpacing: '0.06em', color: '#8a8680' }}>
            Currently available for new projects
          </p>
        </motion.div>

        {/* ── PAGE HEADER ── */}
        <div className="pb-12 md:pb-24" style={{ borderBottom: '1px solid rgba(240,236,228,0.08)' }}>
          <ScrollAnimatedHeading
            text={["Let's Work", 'Together']}
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
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: '#8a8680', maxWidth: '440px', lineHeight: 1.7 }}>
              Drop me a message or reach out directly. I typically respond within 24 hours.
            </p>
          </ScrollReveal>
        </div>

        {/* ── TWO-COL LAYOUT ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-24" style={{ paddingTop: '5rem', paddingBottom: '8rem', alignItems: 'start' }}>
          {/* Left: Contact details */}
          <ScrollReveal>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8680', marginBottom: '2rem' }}>
                Reach Out
              </p>
              <div>
                {contactLinks.map(({ label, buttonText, href }) => (
                  <ContactRow key={label} label={label} buttonText={buttonText} href={href} />
                ))}
              </div>

              {/* Tagline */}
              <div style={{ marginTop: '4rem' }}>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.625rem', color: '#f0ece4', lineHeight: 1.4 }}>
                  "Design is not just what it looks like and feels like. Design is how it works."
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#8a8680', marginTop: '0.75rem' }}>
                  — Steve Jobs
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal delay={0.1}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8680', marginBottom: '2rem' }}>
                Send a Message
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ paddingBlock: '3rem' }}
                >
                  <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.75rem', color: '#f0ece4', marginBottom: '1rem' }}>
                    Message received.
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#8a8680', lineHeight: 1.7 }}>
                    Thank you for reaching out. I'll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FloatingField
                    id="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange('name')}
                  />
                  <FloatingField
                    id="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                  />
                  <FloatingField
                    id="message"
                    label="Your Message"
                    isTextarea
                    value={formData.message}
                    onChange={handleChange('message')}
                  />
                  <div style={{ marginTop: '2.5rem' }}>
                    <button
                      type="submit"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#f0ece4',
                        color: '#0c0c0c',
                        border: 'none',
                        borderRadius: '999px',
                        padding: '0.875rem 2rem',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#e0dcd4'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f0ece4'}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}

function ContactRow({ label, buttonText, href }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBlock: '1.25rem',
        borderBottom: '1px solid rgba(240,236,228,0.08)',
      }}
    >
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a8680' }}>
        {label}
      </p>
      
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          borderRadius: '999px',
          padding: '0.5rem 1.25rem',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          background: hovered ? '#f0ece4' : 'rgba(255, 255, 255, 0.05)',
          color: hovered ? '#0c0c0c' : '#c9c5be',
          border: hovered ? '1px solid #f0ece4' : '1px solid rgba(255,255,255,0.08)',
          boxShadow: hovered ? '0 4px 12px rgba(240,236,228,0.1)' : 'none',
          transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
        }}
      >
        <span>{buttonText}</span>
        <motion.span
          animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '0.75rem' }}
        >
          ↗
        </motion.span>
      </a>
    </div>
  );
}
