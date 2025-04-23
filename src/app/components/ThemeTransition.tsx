'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type ThemeTransitionProps = {
  isDark: boolean;
  clickPosition: { x: number; y: number } | null;
};

export const ThemeTransition = ({ isDark, clickPosition }: ThemeTransitionProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (clickPosition) {
      setIsAnimating(true);
    }
  }, [isDark, clickPosition]);

  if (!clickPosition) return null;

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ 
            clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
            opacity: 1
          }}
          animate={{ 
            clipPath: `circle(${Math.max(window.innerWidth, window.innerHeight)*1.45}px at ${clickPosition.x}px ${clickPosition.y}px)`,
            opacity: 1
          }}
          // Common motion.div properties:
          // - initial: Starting animation state
          // - animate: Target animation state
          // - exit: Animation when component is removed
          // - transition: Animation timing and easing
          // - whileHover: Animation on hover
          // - whileTap: Animation on click/tap
          // - style: CSS properties
          // - className: CSS classes
          // - variants: Predefined animation states
          // - layout: Automatic layout animations
          // - drag: Drag functionality
          // - onAnimationStart: Callback when animation starts
          // - onAnimationComplete: Callback when animation ends
          // - onUpdate: Callback during animation
          // Common clip-path options:
          // - circle(radius at x y): Creates a circular clip path
          // - ellipse(rx ry at x y): Creates an elliptical clip path
          // - polygon(x1 y1, x2 y2, ...): Creates a polygonal clip path
          // - inset(top right bottom left): Creates a rectangular inset
          // - path('SVG path data'): Creates a custom path using SVG syntax
          // - url(#id): References an SVG clipPath element
          // - margin-box: Uses the margin box as the clip path
          // - border-box: Uses the border box as the clip path
          // - padding-box: Uses the padding box as the clip path
          // - content-box: Uses the content box as the clip path
          exit={{ 
            opacity: 0
          }}
          onAnimationComplete={() => setIsAnimating(false)}
          className={`fixed inset-0 z-[60] pointer-events-none ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}; 