import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagicCursorProps {
  theme?: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | 'default';
}

const MagicCursor: React.FC<MagicCursorProps> = ({ theme = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; opacity: number; delay: number }>>([]);

  // Optimized mouse tracking with throttling
  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Reduce sparkle frequency for better performance
    if (Math.random() > 0.85) {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 15,
        y: e.clientY + (Math.random() - 0.5) * 15,
        opacity: 1,
        delay: Math.random() * 0.3
      };
      
      setSparkles(prev => [...prev.slice(-5), newSparkle]); // Limit sparkles for performance
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    
    // Throttle mousemove to 60fps for better performance
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime >= 16) { // ~60fps
        rafId = requestAnimationFrame(() => updateMousePosition(e));
        lastTime = now;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.classList.contains('cursor-pointer') ||
                           !!target.closest('button') ||
                           !!target.closest('a') ||
                           !!target.closest('[role="button"]');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateMousePosition]);

  // Optimized sparkle cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => 
        prev.map(sparkle => ({ ...sparkle, opacity: sparkle.opacity - 0.15 }))
            .filter(sparkle => sparkle.opacity > 0)
      );
    }, 80); // Slower cleanup for better performance

    return () => clearInterval(interval);
  }, []);

  const getWandColors = () => {
    switch (theme) {
      case 'gryffindor': 
        return { 
          handle: '#8B4513', 
          body: '#D2691E', 
          tip: '#DC143C', 
          spark: '#D4AF37',
          sparkles: ['#DC143C', '#D4AF37', '#FFD700']
        };
      case 'slytherin': 
        return { 
          handle: '#2F4F2F', 
          body: '#5D5D5D', 
          tip: '#50C878', 
          spark: '#C0C0C0',
          sparkles: ['#50C878', '#C0C0C0', '#2F4F2F']
        };
      case 'hufflepuff': 
        return { 
          handle: '#8B4513', 
          body: '#D2691E', 
          tip: '#FFDB00', 
          spark: '#000000',
          sparkles: ['#FFDB00', '#F0C75E', '#FFE135']
        };
      case 'ravenclaw': 
        return { 
          handle: '#2F4F4F', 
          body: '#946B2D', 
          tip: '#0F52BA', 
          spark: '#4169E1',
          sparkles: ['#0F52BA', '#946B2D', '#4169E1']
        };
      default: 
        return { 
          handle: '#8B4513', 
          body: '#D2691E', 
          tip: '#D4AF37', 
          spark: '#FFD700',
          sparkles: ['#D4AF37', '#FFD700', '#9370DB']
        };
    }
  };

  const colors = getWandColors();

  return (
    <>
      {/* Harry Potter Magic Wand Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] will-change-transform"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 1.4 : isHovering ? 1.15 : 1,
          rotate: isClicking ? 25 : isHovering ? 10 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          scale: { duration: 0.15 },
          rotate: { duration: 0.15 }
        }}
      >
        {/* Enhanced Harry Potter Wand SVG */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none"
          className="drop-shadow-lg"
        >
          {/* Wand handle with texture */}
          <rect 
            x="3" 
            y="26" 
            width="4" 
            height="10" 
            rx="2" 
            fill={colors.handle}
            transform="rotate(-45 3 26)"
          />
          <rect 
            x="3.5" 
            y="26.5" 
            width="3" 
            height="9" 
            rx="1.5" 
            fill="#A0522D"
            transform="rotate(-45 3.5 26.5)"
            opacity="0.7"
          />
          
          {/* Wand body with gradient */}
          <defs>
            <linearGradient id="wandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.body} />
              <stop offset="50%" stopColor="#CD853F" />
              <stop offset="100%" stopColor={colors.body} />
            </linearGradient>
          </defs>
          <rect 
            x="8" 
            y="21" 
            width="2.5" 
            height="15" 
            rx="1.25" 
            fill="url(#wandGradient)"
            transform="rotate(-45 8 21)"
          />
          
          {/* Magical core */}
          <rect 
            x="8.75" 
            y="21.75" 
            width="1" 
            height="13" 
            rx="0.5" 
            fill={colors.spark}
            transform="rotate(-45 8.75 21.75)"
            opacity="0.6"
            className="animate-pulse"
          />
          
          {/* Wand tip with enhanced magic effect */}
          <circle 
            cx="24" 
            cy="8" 
            r="3" 
            fill={colors.tip}
            className="animate-pulse"
          />
          <circle 
            cx="24" 
            cy="8" 
            r="2" 
            fill={colors.spark}
            opacity="0.8"
          />
          <circle 
            cx="24" 
            cy="8" 
            r="1" 
            fill="#FFFFFF"
            opacity="0.9"
            className="animate-pulse"
          />
          
          {/* Enhanced magic trail */}
          <circle 
            cx="21" 
            cy="11" 
            r="1.5" 
            fill={colors.tip}
            opacity="0.7"
          />
          <circle 
            cx="18" 
            cy="14" 
            r="1" 
            fill={colors.spark}
            opacity="0.5"
          />
          <circle 
            cx="15" 
            cy="17" 
            r="0.5" 
            fill={colors.tip}
            opacity="0.3"
          />
        </svg>

        {/* Magical aura when clicking */}
        {isClicking && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle, ${colors.tip}40 0%, transparent 70%)`,
            }}
          />
        )}
      </motion.div>

      {/* Optimized Harry Potter Sparkle Trail */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed pointer-events-none z-[9998] will-change-transform"
          initial={{ 
            x: sparkle.x, 
            y: sparkle.y, 
            scale: 0.8,
            opacity: sparkle.opacity 
          }}
          animate={{ 
            y: sparkle.y - 25,
            x: sparkle.x + (Math.random() - 0.5) * 10,
            scale: 0,
            opacity: 0,
            rotate: 360
          }}
          transition={{ 
            duration: 1.2,
            delay: sparkle.delay,
            ease: "easeOut"
          }}
        >
          {/* Harry Potter style sparkles - alternating between stars and diamonds */}
          <svg width="10" height="10" viewBox="0 0 10 10">
            {Math.random() > 0.5 ? (
              // Star sparkle
              <path
                d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z"
                fill={colors.sparkles[Math.floor(Math.random() * colors.sparkles.length)]}
              />
            ) : (
              // Diamond sparkle
              <path
                d="M5 1 L8 5 L5 9 L2 5 Z"
                fill={colors.sparkles[Math.floor(Math.random() * colors.sparkles.length)]}
              />
            )}
          </svg>
        </motion.div>
      ))}
    </>
  );
};

export default MagicCursor;
