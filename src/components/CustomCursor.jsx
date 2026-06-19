import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const updateCursorState = (target) => {
      if (!target) {
        setIsHoveringCard(false);
        setIsHoveringLink(false);
        setIsOverFooter(false);
        return;
      }
      const hasCard = target.closest('[data-cursor="card"]');
      const hasLink = target.closest('a, button, [role="button"]');
      const hasFooter = target.closest('footer');

      setIsOverFooter(!!hasFooter);

      if (hasCard) {
        setIsHoveringCard(true);
        setIsHoveringLink(false);
      } else if (hasLink) {
        setIsHoveringLink(true);
        setIsHoveringCard(false);
      } else {
        setIsHoveringCard(false);
        setIsHoveringLink(false);
      }
    };

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      updateCursorState(e.target);
    };

    const handleMouseOver = (e) => {
      updateCursorState(e.target);
    };

    const handleMouseLeaveDoc = () => {
      setIsVisible(false);
      setIsHoveringCard(false);
      setIsHoveringLink(false);
      setIsOverFooter(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveDoc);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
    };
  }, [mouseX, mouseY, isVisible]);

  const size = isHoveringCard ? 72 : isHoveringLink ? 64 : 40;

  const isDarkArea = !isLight || isOverFooter;

  // Invert cursor colors for light vs dark background
  const borderColor  = isDarkArea ? 'rgba(240, 236, 228, 0.85)' : 'rgba(15, 14, 13, 0.85)';
  const hoverBg      = isDarkArea ? 'rgba(240, 236, 228, 0.10)' : 'rgba(15, 14, 13, 0.08)';
  const cardBg       = isDarkArea ? 'rgba(240, 236, 228, 0.12)' : 'rgba(15, 14, 13, 0.10)';
  const labelColor   = isDarkArea ? '#f0ece4'                   : '#0f0e0d';

  const bg = isHoveringCard ? cardBg : isHoveringLink ? hoverBg : 'transparent';

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      animate={{ width: size, height: size, backgroundColor: bg }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        animate={{ borderColor, borderWidth: '1px', borderStyle: 'solid' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Precise Central Dot */}
        <div
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: borderColor,
            transition: 'background-color 0.3s ease',
          }}
        />

        {isHoveringCard && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            style={{
              fontSize: '0.625rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: labelColor,
              transition: 'color 0.3s ease',
              zIndex: 2,
            }}
          >
            View
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
