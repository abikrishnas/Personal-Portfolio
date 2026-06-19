import { motion, useReducedMotion } from 'framer-motion';

export default function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const pageVariants = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: shouldReduceMotion ? 0.1 : 0.4, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: shouldReduceMotion 
      ? { opacity: 0, transition: { duration: 0.05 } } 
      : { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
