'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wand2, Sparkles, BookOpen, Castle, Star } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { User } from '../types';
import SortingHat from './SortingHat';
import MagicalParticles from './MagicalParticles';
import { soundLibrary } from './SoundManager';

interface LandingPageProps {
  onEnterAcademy: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterAcademy }) => {
  const [showSortingHat, setShowSortingHat] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const navigate = useNavigate();

  const handleBeginJourney = () => {
    soundLibrary.play('spellCast');
    if (!userName.trim()) {
      setShowNameInput(true);
      return;
    }
    setShowSortingHat(true);
  };

  const handleSorted = (house: User['house']) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userName,
      house,
      level: 1,
      totalXP: 0,
      joinedAt: new Date()
    };
    
    soundLibrary.play('achievement');
    onEnterAcademy(newUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MagicalParticles />
      
      {/* Hogwarts Castle Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <Castle className="w-32 h-32 text-purple-900/40" />
        </div>
      </div>

      {/* Floating Candles */}
      <div className="absolute top-20 left-10">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-4xl"
        >
          🕯️
        </motion.div>
      </div>

      <div className="absolute top-32 right-16">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="text-3xl"
        >
          🕯️
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mb-12"
        >
          {/* Magical Title with Floating Letters */}
          <motion.div className="relative mb-8">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 mb-6 relative"
              animate={{ 
                textShadow: [
                  '0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706',
                  '0 0 30px #fbbf24, 0 0 50px #f59e0b, 0 0 70px #d97706',
                  '0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706'
                ]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              SpellAcademia
            </motion.h1>
            
            {/* Floating magical symbols around title */}
            <motion.div
              className="absolute -top-4 -left-4 text-2xl"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ⚡
            </motion.div>
            
            <motion.div
              className="absolute -top-2 -right-6 text-xl"
              animate={{ 
                rotate: -360,
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔮
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-amber-100 mb-8 font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            "Learn Web Development, One Spell at a Time"
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
            className="flex items-center justify-center gap-6 text-purple-200 mb-8"
          >
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <Wand2 className="w-6 h-6 text-amber-400" />
              <span className="text-lg">Master HTML</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-lg">Enchant with CSS</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-6 h-6 text-blue-400" />
              <span className="text-lg">Conjure JavaScript</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {!showNameInput && !showSortingHat && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <SignedOut>
                <div className="flex gap-4">
                  <SignInButton mode="modal">
                    <motion.button
                      onMouseEnter={() => soundLibrary.play('hover')}
                      className="group relative px-8 py-3 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-gray-400/30"
                      whileHover={{ 
                        boxShadow: '0 0 40px rgba(75, 85, 99, 0.6)',
                        y: -4,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Wand2 className="w-5 h-5" />
                        Sign In
                      </span>
                    </motion.button>
                  </SignInButton>
                  
                  <SignUpButton mode="modal">
                    <motion.button
                      onMouseEnter={() => soundLibrary.play('hover')}
                      className="group relative px-12 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-amber-400/30"
                      whileHover={{ 
                        boxShadow: '0 0 40px rgba(147, 51, 234, 0.6), 0 0 80px rgba(251, 191, 36, 0.3)',
                        y: -4,
                        borderColor: 'rgba(251, 191, 36, 0.8)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <BookOpen className="w-6 h-6" />
                        Enter SpellAcademia
                        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                      
                      {/* Magical glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.button>
                  </SignUpButton>
                </div>
              </SignedOut>
              
              <SignedIn>
                <motion.button
                  onMouseEnter={() => soundLibrary.play('hover')}
                  onClick={handleBeginJourney}
                  className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-full text-white font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-amber-400/30"
                  whileHover={{ 
                    boxShadow: '0 0 40px rgba(147, 51, 234, 0.6), 0 0 80px rgba(251, 191, 36, 0.3)',
                    y: -8,
                    borderColor: 'rgba(251, 191, 36, 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <BookOpen className="w-6 h-6" />
                    Continue Your Journey
                    <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                  
                  {/* Magical glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.button>
              </SignedIn>
            </motion.div>
          )}

          {showNameInput && !showSortingHat && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border-2 border-amber-400/30 shadow-2xl"
            >
              <motion.h2 
                className="text-2xl font-bold text-amber-300 mb-6 text-center font-serif"
                animate={{
                  textShadow: [
                    '0 0 10px #fbbf24',
                    '0 0 20px #fbbf24',
                    '0 0 10px #fbbf24'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                What shall we call you, young wizard?
              </motion.h2>
              
              <motion.input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your magical name..."
                className="w-full px-6 py-4 bg-purple-900/50 border-2 border-purple-500/50 rounded-lg text-white placeholder-purple-300 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 mb-6 font-serif text-lg"
                autoFocus
                whileFocus={{ scale: 1.02 }}
              />
              
              <motion.button
                onClick={handleBeginJourney}
                onMouseEnter={() => soundLibrary.play('hover')}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-lg text-black font-bold hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ 
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)' 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to the Sorting Hat
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSortingHat && (
            <SortingHat userName={userName} onSorted={handleSorted} />
          )}
        </AnimatePresence>

        {/* Magical Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-purple-300 max-w-2xl px-4"
        >
          <motion.p 
            className="text-sm italic font-serif mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "It is our choices that show what we truly are, far more than our abilities."
          </motion.p>
          <p className="text-xs text-purple-400">- Albus Dumbledore</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;