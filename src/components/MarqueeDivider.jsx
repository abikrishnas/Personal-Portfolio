export default function MarqueeDivider({ items, speed = 18 }) {
  const text = items || [
    'Selected Work', 'Built with Precision', 'Design & Code', 'Open to Collaborate',
  ];

  const repeated = [...text, ...text, ...text, ...text];

  return (
    <div
      className="theme-surface2"
      style={{
        borderTop: '1px solid var(--c-border)',
        borderBottom: '1px solid var(--c-border)',
        overflow: 'hidden',
        paddingBlock: '1.125rem',
        transition: 'background-color 0.75s cubic-bezier(0.4,0,0.2,1), border-color 0.45s ease',
      }}
    >
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--c-muted)',
              whiteSpace: 'nowrap',
              paddingInline: '2rem',
              transition: 'color 0.45s ease',
            }}
          >
            {item}
            <span style={{ paddingLeft: '2rem', opacity: 0.4 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
