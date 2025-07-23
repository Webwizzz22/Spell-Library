'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface MagicCursorProps {
  theme?: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | 'default';
}

const MagicCursor: React.FC<MagicCursorProps> = ({ theme = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  // Heavy throttling for performance - only update 15 times per second max
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdateRef.current < 66) return; // Limit to 15fps max
    
    lastUpdateRef.current = now;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    });
  }, [isVisible]);

  // Debounced hover detection
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const checkHover = useCallback((e: MouseEvent) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') || 
                           target.closest('a') || 
                           target.closest('[role="button"]') ||
                           target.classList.contains('cursor-pointer');
      setIsHovering(!!isInteractive);
    }, 100);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Use passive listeners and optimize event handling
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', checkHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [updateMousePosition, checkHover]);

  const getWandColors = () => {
    switch (theme) {
      case 'gryffindor': 
        return { tip: '#DC143C', body: '#D2691E' };
      case 'slytherin': 
        return { tip: '#50C878', body: '#5D5D5D' };
      case 'hufflepuff': 
        return { tip: '#FFDB00', body: '#D2691E' };
      case 'ravenclaw': 
        return { tip: '#0F52BA', body: '#946B2D' };
      default: 
        return { tip: '#D4AF37', body: '#D2691E' };
    }
  };

  const colors = getWandColors();

  // Don't render until mouse moves for better performance
  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] magic-cursor"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isClicking ? 1.1 : isHovering ? 1.05 : 1,
        rotate: isClicking ? 8 : 0,
      }}
      transition={{ 
        type: "tween", 
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      {/* Simplified SVG for better performance */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none"
        className="drop-shadow-sm"
      >
        {/* Wand handle */}
        <rect 
          x="3" 
          y="26" 
          width="3" 
          height="8" 
          rx="1.5" 
          fill="#8B4513"
          transform="rotate(-45 3 26)"
        />
        
        {/* Wand body */}
        <rect 
          x="8" 
          y="21" 
          width="2" 
          height="12" 
          rx="1" 
          fill={colors.body}
          transform="rotate(-45 8 21)"
        />
        
        {/* Wand tip */}
        <circle 
          cx="24" 
          cy="8" 
          r="2.5" 
          fill={colors.tip}
        />
        <circle 
          cx="24" 
          cy="8" 
          r="1.5" 
          fill="#FFFFFF"
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
};

export default MagicCursor;
