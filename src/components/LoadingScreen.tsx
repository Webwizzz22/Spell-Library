import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [currentSpell, setCurrentSpell] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'spells' | 'scenes' | 'complete'>('spells');

  const spellSequence = [
    {
      spell: 'Alohomora',
      description: 'Unlocking the mysteries of the wizarding world...',
      effect: '🔓',
      duration: 2000
    },
    {
      spell: 'Lumos',
      description: 'Illuminating the path to Hogwarts...',
      effect: '💡',
      duration: 1800
    },
    {
      spell: 'Expecto Patronum',
      description: 'Summoning magical protections...',
      effect: '🦌',
      duration: 2200
    },
    {
      spell: 'Wingardium Leviosa',
      description: 'Levitating magical elements...',
      effect: '🪶',
      duration: 1600
    },
    {
      spell: 'Accio',
      description: 'Gathering wizarding knowledge...',
      effect: '📚',
      duration: 1800
    }
  ];

  const movieScenes = [
    {
      title: 'The Boy Who Lived',
      description: 'Harry discovers his magical heritage...',
      image: '🏠'
    },
    {
      title: 'Platform 9¾',
      description: 'First journey to Hogwarts begins...',
      image: '🚂'
    },
    {
      title: 'The Sorting Hat',
      description: 'Finding your place at Hogwarts...',
      image: '🎩'
    },
    {
      title: 'Quidditch Match',
      description: 'Soaring through magical skies...',
      image: '🧙‍♂️'
    }
  ];

  useEffect(() => {
    let currentTime = 0;
    const totalSpellTime = spellSequence.reduce((sum, spell) => sum + spell.duration, 0);
    
    const spellInterval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + 1, 100));
    }, (totalSpellTime / 60)); // 60% for spells

    // Spell sequence
    spellSequence.forEach((spell, index) => {
      setTimeout(() => {
        setCurrentSpell(index);
      }, currentTime);
      currentTime += spell.duration;
    });

    // Transition to scenes
    setTimeout(() => {
      setCurrentPhase('scenes');
      clearInterval(spellInterval);
      
      // Scene progression (30% of loading)
      const sceneInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 1, 95));
      }, 100);

      // Complete loading
      setTimeout(() => {
        clearInterval(sceneInterval);
        setCurrentPhase('complete');
        setLoadingProgress(100);
        
        setTimeout(() => {
          onLoadingComplete();
        }, 1500);
      }, 3000);
      
    }, totalSpellTime);

  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-950 flex items-center justify-center z-50 overflow-hidden">
      {/* Magical Background Effects */}
      <div className="absolute inset-0">
        {/* Floating magical particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: -10,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            style={{
              boxShadow: '0 0 10px currentColor'
            }}
          />
        ))}

        {/* Magical symbols */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-yellow-300 text-3xl opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: 0
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            {['✨', '⭐', '🌟', '💫', '✦', '⚡', '🔮'][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}

        {/* Aurora effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Main Logo/Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 mb-4 font-serif"
            animate={{
              textShadow: [
                '0 0 20px #fbbf24',
                '0 0 40px #fbbf24',
                '0 0 20px #fbbf24'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            ⚡ Wizarding World ⚡
          </motion.h1>
          
          <motion.p
            className="text-xl text-purple-200 font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading your magical experience...
          </motion.p>
        </motion.div>

        {/* Spell Casting Phase */}
        <AnimatePresence mode="wait">
          {currentPhase === 'spells' && (
            <motion.div
              key="spells"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <motion.div
                key={currentSpell}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border-2 border-purple-500/30 mb-8"
              >
                {/* Spell Effect Animation */}
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {spellSequence[currentSpell]?.effect}
                </motion.div>

                {/* Wand Animation */}
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ rotate: [0, 360] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="text-4xl">🪄</div>
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold text-amber-300 mb-3"
                  animate={{ 
                    textShadow: [
                      '0 0 10px #fbbf24',
                      '0 0 20px #fbbf24',
                      '0 0 10px #fbbf24'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                  {spellSequence[currentSpell]?.spell}
                </motion.h2>
                
                <p className="text-lg text-purple-200">
                  {spellSequence[currentSpell]?.description}
                </p>

                {/* Magical sparks around spell */}
                <div className="relative">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '0 0'
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: i * 45,
                        x: 30,
                        y: -15
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Movie Scenes Phase */}
          {currentPhase === 'scenes' && (
            <motion.div
              key="scenes"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="mb-8"
            >
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border-2 border-purple-500/30">
                <h2 className="text-2xl font-bold text-amber-300 mb-6">
                  Preparing Your Journey...
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {movieScenes.map((scene, index) => (
                    <motion.div
                      key={scene.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.3 }}
                      className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30"
                    >
                      <div className="text-3xl mb-2">{scene.image}</div>
                      <h3 className="font-semibold text-white text-sm mb-1">{scene.title}</h3>
                      <p className="text-xs text-gray-300">{scene.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Completion Phase */}
          {currentPhase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border-2 border-green-500/30">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  ✨
                </motion.div>
                
                <h2 className="text-3xl font-bold text-green-300 mb-3">
                  Magic is Ready!
                </h2>
                
                <p className="text-lg text-green-200">
                  Welcome to the Wizarding World...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-200 font-medium">Loading Progress</span>
            <span className="text-amber-300 font-bold">{loadingProgress}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 relative"
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Magical shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>

          {/* Loading steps indicator */}
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span className={loadingProgress >= 20 ? 'text-green-400' : ''}>Spells</span>
            <span className={loadingProgress >= 60 ? 'text-green-400' : ''}>Locations</span>
            <span className={loadingProgress >= 90 ? 'text-green-400' : ''}>Characters</span>
            <span className={loadingProgress >= 100 ? 'text-green-400' : ''}>Ready</span>
          </div>
        </motion.div>

        {/* Magical Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 text-center"
        >
          <motion.p 
            className="text-sm italic font-serif text-purple-300 mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "Happiness can be found even in the darkest of times, if one only remembers to turn on the light."
          </motion.p>
          <p className="text-xs text-purple-400">- Albus Dumbledore</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
