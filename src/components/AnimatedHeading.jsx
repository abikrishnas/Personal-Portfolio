import { motion } from 'framer-motion';

/**
 * AnimatedHeading — splits text into lines, each line reveals with opacity and slide
 * with staggered delay per line.
 */
export default function AnimatedHeading({ text, tag = 'h1', style = {}, className = '', delay = 0 }) {
  const lines = Array.isArray(text) ? text : [text];
  const Tag = tag;

  return (
    <Tag style={style} className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.12,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * ScrollAnimatedHeading — same but triggers on scroll into view
 */
export function ScrollAnimatedHeading({ text, tag = 'h2', style = {}, className = '', delay = 0 }) {
  const lines = Array.isArray(text) ? text : [text];
  const Tag = tag;

  return (
    <Tag style={style} className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.12,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
