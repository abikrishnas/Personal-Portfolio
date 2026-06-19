import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, className = '', once = true }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
