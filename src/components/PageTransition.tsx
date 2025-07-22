import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const locationThemes = {
  '/': {
    name: 'Landing',
    particles: ['✨', '🏰', '🦉'],
    color: '#FFD700',
    background: 'from-purple-900 via-blue-900 to-indigo-900'
  },
  '/dashboard': {
    name: 'Great Hall',
    particles: ['🕯️', '⭐', '🍂'],
    color: '#D4AF37',
    background: 'from-amber-800 via-orange-800 to-red-800'
  },
  '/characters': {
    name: 'Portrait Gallery',
    particles: ['🖼️', '👤', '✨'],
    color: '#9370DB',
    background: 'from-purple-800 via-indigo-800 to-blue-800'
  },
  '/journey': {
    name: 'Marauder\'s Map',
    particles: ['🗺️', '👣', '🌟'],
    color: '#8B4513',
    background: 'from-amber-700 via-yellow-700 to-orange-700'
  },
  '/spellbook': {
    name: 'Library',
    particles: ['📚', '📜', '🪶'],
    color: '#228B22',
    background: 'from-green-800 via-emerald-800 to-teal-800'
  },
  '/404': {
    name: 'Room of Requirement',
    particles: ['❓', '🔮', '💫'],
    color: '#DC143C',
    background: 'from-red-800 via-pink-800 to-purple-800'
  }
};

const getLocationTransition = (pathname: string) => {
  if (pathname.includes('/spells/')) {
    return {
      name: 'Spell Classroom',
      particles: ['🪄', '⚡', '✨'],
      color: '#4169E1',
      background: 'from-blue-800 via-indigo-800 to-purple-800'
    };
  }
  
  return locationThemes[pathname as keyof typeof locationThemes] || locationThemes['/'];
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const theme = getLocationTransition(location.pathname);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      rotateY: 15,
      filter: 'blur(10px)'
    },
    in: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.1
      }
    },
    out: {
      opacity: 0,
      scale: 1.05,
      rotateY: -15,
      filter: 'blur(5px)',
      transition: {
        duration: 0.4,
        ease: [0.55, 0.085, 0.68, 0.53] as const
      }
    }
  };

  const overlayVariants = {
    initial: { 
      opacity: 0,
      scale: 0,
      borderRadius: '50%'
    },
    animate: { 
      opacity: [0, 0.8, 0],
      scale: [0, 2, 4],
      borderRadius: ['50%', '25%', '0%'],
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const
      }
    }
  };

  const magicalElementVariants = {
    initial: { 
      opacity: 0,
      y: 50,
      rotate: 0,
      scale: 0
    },
    animate: { 
      opacity: [0, 1, 0],
      y: [50, -50, -100],
      rotate: [0, 180, 360],
      scale: [0, 1, 0],
      transition: {
        duration: 1.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Transition Overlay */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${location.pathname}`}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          className={`fixed inset-0 z-50 pointer-events-none bg-gradient-to-br ${theme.background}`}
          style={{
            transformOrigin: 'center center'
          }}
        />
      </AnimatePresence>

      {/* Location Name Display */}
      <AnimatePresence>
        <motion.div
          key={`name-${location.pathname}`}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 1],
            y: [50, 0, 0, -20]
          }}
          transition={{ 
            duration: 1.5,
            times: [0, 0.3, 0.7, 1],
            ease: "easeOut"
          }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <motion.h2
              className="text-6xl font-bold font-serif"
              style={{ 
                color: theme.color,
                textShadow: `0 0 30px ${theme.color}, 0 0 60px ${theme.color}`,
                filter: `drop-shadow(0 0 20px ${theme.color})`
              }}
              animate={{
                textShadow: [
                  `0 0 30px ${theme.color}`,
                  `0 0 50px ${theme.color}, 0 0 80px ${theme.color}`,
                  `0 0 30px ${theme.color}`
                ]
              }}
              transition={{ duration: 1, repeat: 2 }}
            >
              {theme.name}
            </motion.h2>
            
            <motion.div
              className="flex justify-center space-x-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {theme.particles.map((particle, index) => (
                <motion.span
                  key={index}
                  className="text-4xl"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                    repeat: 1
                  }}
                >
                  {particle}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Magical Elements Animation */}
      <AnimatePresence>
        <motion.div
          key={`elements-${location.pathname}`}
          className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              variants={magicalElementVariants}
              initial="initial"
              animate="animate"
              className="absolute text-3xl"
              style={{
                left: `${10 + (i * 6)}%`,
                top: `${20 + (i % 4) * 20}%`,
                color: theme.color,
                filter: `drop-shadow(0 0 10px ${theme.color})`
              }}
            >
              {theme.particles[i % theme.particles.length]}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Sparkle Trail Effect */}
      <AnimatePresence>
        <motion.div
          key={`sparkles-${location.pathname}`}
          className="fixed inset-0 z-30 pointer-events-none"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: theme.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 10px ${theme.color}`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [(Math.random() - 0.5) * 200],
                y: [(Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: 1.2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Magical Ripple Effect */}
      <AnimatePresence>
        <motion.div
          key={`ripple-${location.pathname}`}
          className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 rounded-full"
              style={{ borderColor: theme.color }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ 
                scale: [0, 3, 6],
                opacity: [0.8, 0.4, 0]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Vortex Effect for Dramatic Transitions */}
      <AnimatePresence>
        <motion.div
          key={`vortex-${location.pathname}`}
          className="fixed inset-0 z-25 pointer-events-none"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <radialGradient id={`vortex-${theme.name}`}>
                <stop offset="0%" stopColor={theme.color} stopOpacity="0" />
                <stop offset="50%" stopColor={theme.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={theme.color} stopOpacity="0" />
              </radialGradient>
            </defs>
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill={`url(#vortex-${theme.name})`}
              initial={{ r: 0, opacity: 0 }}
              animate={{ 
                r: [0, 50, 100],
                opacity: [0, 0.6, 0]
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
