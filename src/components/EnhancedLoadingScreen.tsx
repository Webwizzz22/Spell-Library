import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, Crown, Castle } from 'lucide-react';

interface EnhancedLoadingScreenProps {
  onLoadingComplete: () => void;
}

const EnhancedLoadingScreen: React.FC<EnhancedLoadingScreenProps> = ({ onLoadingComplete }) => {
  const [currentSpell, setCurrentSpell] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'spells' | 'scenes' | 'complete'>('spells');
  const [spellCastingActive, setSpellCastingActive] = useState(false);
  const [wandGlow, setWandGlow] = useState(false);

  const spellSequence = [
    {
      spell: 'Alohomora',
      description: 'Unlocking the mysteries of the wizarding world...',
      effect: '🔓',
      color: '#FFD700',
      wandMovement: 'flick',
      duration: 2000,
      particles: ['✨', '🔑', '💫']
    },
    {
      spell: 'Lumos',
      description: 'Illuminating the path to Hogwarts...',
      effect: '💡',
      color: '#F0E68C',
      wandMovement: 'raise',
      duration: 1800,
      particles: ['💡', '⭐', '✨']
    },
    {
      spell: 'Expecto Patronum',
      description: 'Summoning magical protections...',
      effect: '🦌',
      color: '#87CEEB',
      wandMovement: 'circle',
      duration: 2200,
      particles: ['🦌', '🐺', '🦅', '💫']
    },
    {
      spell: 'Wingardium Leviosa',
      description: 'Levitating magical elements...',
      effect: '🪶',
      color: '#DDA0DD',
      wandMovement: 'swish',
      duration: 1600,
      particles: ['🪶', '📚', '✨']
    },
    {
      spell: 'Accio',
      description: 'Gathering wizarding knowledge...',
      effect: '📚',
      color: '#98FB98',
      wandMovement: 'point',
      duration: 1800,
      particles: ['📚', '📜', '💫', '⚡']
    },
    {
      spell: 'Protego',
      description: 'Establishing magical defenses...',
      effect: '🛡️',
      color: '#4169E1',
      wandMovement: 'shield',
      duration: 1900,
      particles: ['🛡️', '⚡', '✨']
    }
  ];

  const movieScenes = [
    {
      title: 'The Boy Who Lived',
      description: 'Harry discovers his magical heritage at the Dursleys...',
      image: '🏠',
      quote: '"You\'re a wizard, Harry!"',
      atmosphere: 'mysterious'
    },
    {
      title: 'Platform 9¾',
      description: 'First journey to Hogwarts begins at King\'s Cross...',
      image: '🚂',
      quote: '"Close your eyes. Go on."',
      atmosphere: 'adventurous'
    },
    {
      title: 'The Sorting Hat',
      description: 'Finding your place at Hogwarts School...',
      image: '🎩',
      quote: '"Better be... GRYFFINDOR!"',
      atmosphere: 'magical'
    },
    {
      title: 'The Great Hall',
      description: 'Feast under the enchanted ceiling...',
      image: '🕯️',
      quote: '"Welcome to Hogwarts!"',
      atmosphere: 'grand'
    },
    {
      title: 'Quidditch Match',
      description: 'Soaring through magical skies on broomsticks...',
      image: '🧙‍♂️',
      quote: '"Catch the Golden Snitch!"',
      atmosphere: 'thrilling'
    }
  ];

  const wandMovements = {
    flick: { rotate: [0, -30, 15, 0], x: [0, 10, -5, 0] },
    raise: { y: [0, -20, 0], rotate: [0, 15, 0] },
    circle: { rotate: [0, 360], scale: [1, 1.1, 1] },
    swish: { x: [0, 30, -30, 0], rotate: [0, 45, -45, 0] },
    point: { rotate: [0, -15, 0], y: [0, -10, 0] },
    shield: { scale: [1, 1.2, 1], rotate: [0, 180, 360] }
  };

  useEffect(() => {
    let currentTime = 0;
    const totalSpellTime = spellSequence.reduce((sum, spell) => sum + spell.duration, 0);
    
    const spellInterval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + 0.8, 70));
    }, (totalSpellTime / 70)); // 70% for spells

    // Spell sequence with animations
    spellSequence.forEach((spell, index) => {
      setTimeout(() => {
        setCurrentSpell(index);
        setSpellCastingActive(true);
        setWandGlow(true);
        
        // End spell casting animation
        setTimeout(() => {
          setSpellCastingActive(false);
          setWandGlow(false);
        }, spell.duration * 0.7);
      }, currentTime);
      currentTime += spell.duration;
    });

    // Transition to scenes
    setTimeout(() => {
      setCurrentPhase('scenes');
      clearInterval(spellInterval);
      
      // Scene progression (25% of loading)
      const sceneInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 1, 95));
      }, 150);

      // Complete loading
      setTimeout(() => {
        clearInterval(sceneInterval);
        setCurrentPhase('complete');
        setLoadingProgress(100);
        
        setTimeout(() => {
          onLoadingComplete();
        }, 1000);
      }, 3000);
    }, totalSpellTime);

    return () => {
      clearInterval(spellInterval);
    };
  }, [onLoadingComplete]);

  const currentSpellData = spellSequence[currentSpell];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {currentPhase === 'spells' && (
            <motion.div
              key="spells"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="space-y-8"
            >
              {/* Hogwarts Crest */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <Crown className="w-20 h-20 text-yellow-400" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-yellow-400/30 rounded-full"
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-serif"
              >
                Hogwarts Library
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl text-gray-300 italic"
              >
                "Draco dormiens nunquam titillandus"
              </motion.p>

              {/* Wand and Spell Casting */}
              <div className="flex flex-col items-center space-y-6">
                <motion.div
                  className="relative"
                  animate={wandGlow ? { 
                    filter: `drop-shadow(0 0 20px ${currentSpellData?.color || '#FFD700'})` 
                  } : {}}
                >
                  <motion.div
                    animate={spellCastingActive && currentSpellData ? 
                      wandMovements[currentSpellData.wandMovement as keyof typeof wandMovements] : 
                      { rotate: 0, x: 0, y: 0, scale: 1 }
                    }
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <Wand2 
                      className="w-16 h-16" 
                      style={{ color: currentSpellData?.color || '#FFD700' }}
                    />
                  </motion.div>
                  
                  {/* Spell particles */}
                  <AnimatePresence>
                    {spellCastingActive && currentSpellData && (
                      <>
                        {currentSpellData.particles.map((particle, i) => (
                          <motion.div
                            key={`${currentSpell}-${i}`}
                            initial={{ 
                              opacity: 0, 
                              scale: 0, 
                              x: 0, 
                              y: 0 
                            }}
                            animate={{ 
                              opacity: [0, 1, 0], 
                              scale: [0, 1.5, 0],
                              x: (Math.random() - 0.5) * 100,
                              y: (Math.random() - 0.5) * 100,
                              rotate: 360
                            }}
                            transition={{ 
                              duration: 1.5,
                              delay: i * 0.2,
                              ease: "easeOut"
                            }}
                            className="absolute text-2xl pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          >
                            {particle}
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Spell Information */}
                <motion.div
                  key={currentSpell}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-3"
                >
                  <motion.h2
                    className="text-4xl font-bold"
                    style={{ color: currentSpellData?.color || '#FFD700' }}
                    animate={spellCastingActive ? {
                      scale: [1, 1.1, 1],
                      textShadow: `0 0 20px ${currentSpellData?.color || '#FFD700'}`
                    } : {}}
                  >
                    {currentSpellData?.spell}
                  </motion.h2>
                  
                  <motion.div
                    className="text-6xl"
                    animate={spellCastingActive ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                  >
                    {currentSpellData?.effect}
                  </motion.div>
                  
                  <p className="text-gray-300 text-lg max-w-md">
                    {currentSpellData?.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentPhase === 'scenes' && (
            <motion.div
              key="scenes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="flex justify-center mb-8"
              >
                <Castle className="w-24 h-24 text-yellow-400" />
              </motion.div>

              <h2 className="text-5xl font-bold text-yellow-400 font-serif">
                Magical Memories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {movieScenes.map((scene, index) => (
                  <motion.div
                    key={scene.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.2 }
                    }}
                    className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{scene.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{scene.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{scene.description}</p>
                    <p className="text-yellow-400 italic text-sm">{scene.quote}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPhase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, ease: "linear" },
                  scale: { duration: 1, repeat: 3 }
                }}
              >
                <Sparkles className="w-32 h-32 text-yellow-400 mx-auto" />
              </motion.div>
              
              <motion.h2
                animate={{ 
                  scale: [1, 1.1, 1],
                  color: ['#FFD700', '#FFA500', '#FFD700']
                }}
                transition={{ duration: 1, repeat: 2 }}
                className="text-6xl font-bold text-yellow-400 font-serif"
              >
                Welcome to Hogwarts!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl text-white"
              >
                Your magical journey begins now...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 w-full max-w-md mx-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Loading Progress</span>
            <span className="text-sm text-yellow-400 font-bold">{Math.round(loadingProgress)}%</span>
          </div>
          
          <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating magical elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`magic-${i}`}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeOut",
            }}
          >
            {['✨', '⭐', '🌟', '💫', '⚡'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedLoadingScreen;
