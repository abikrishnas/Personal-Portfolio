import { useState } from 'react';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abikrishna-s', color: '#4a9eff' },
  { label: 'Mail', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=abikrishna.prof@gmail.com', color: 'rgba(240,236,228,0.42)' },
  { label: 'Instagram', href: 'https://www.instagram.com/just__.abi', color: 'rgba(240,236,228,0.42)' },
  { label: 'Whatsapp', href: 'https://wa.me/918606313088', color: '#ea4c89' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#0c0c0c', overflow: 'hidden' }}>
      {/* ── BOTTOM BAR ── */}
      <div className="px-5 md:px-10 py-12 md:py-16" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1280px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,236,228,0.45)' }}>
          © {year} Abikrishna. S
        </p>
        <nav style={{ display: 'flex', gap: '3.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {socials.map(s => <SocialLink key={s.label} {...s} />)}
        </nav>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,236,228,0.45)' }}>
          Designed &amp; built by Abikrishna.S
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ label, href, color }) {
  const [hov, setHov] = useState(false);
  const base = 'rgba(240,236,228,0.35)';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        letterSpacing: '0.11em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hov ? color : base,
        transition: 'color 0.22s ease',
        paddingBottom: '2px',
      }}
    >
      {label}
      <span style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: '100%', height: '1px',
        background: hov ? color : 'transparent',
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.22s ease, background 0.22s ease',
      }} />
    </a>
  );
}
