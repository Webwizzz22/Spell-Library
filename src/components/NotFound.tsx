'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wand2, 
  Star, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle,
  XCircle,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { harryPotterSpells, HarryPotterSpell } from '../data/harryPotterSpells';
import { enhancedSoundLibrary } from './SoundManager';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [currentSpell, setCurrentSpell] = useState<HarryPotterSpell | null>(null);
  const [userGuess, setUserGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'incorrect'>('playing');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);

  const getRandomSpell = () => {
    const randomIndex = Math.floor(Math.random() * harryPotterSpells.length);
    return harryPotterSpells[randomIndex];
  };

  const startNewRound = () => {
    const spell = getRandomSpell();
    setCurrentSpell(spell);
    setUserGuess('');
    setGameState('playing');
    setShowHint(false);
    setHintsUsed(0);
    if (!gameStarted) {
      setGameStarted(true);
      enhancedSoundLibrary.play('spellCast');
    }
  };

  const handleGuess = () => {
    if (!currentSpell || !userGuess.trim()) return;

    const isCorrect = userGuess.toLowerCase().trim() === currentSpell.incantation.toLowerCase();
    setAttempts(prev => prev + 1);

    if (isCorrect) {
      setGameState('correct');
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      enhancedSoundLibrary.play('achievement');
      
      // Auto advance after 2 seconds
      setTimeout(() => {
        startNewRound();
      }, 2000);
    } else {
      setGameState('incorrect');
      setStreak(0);
      enhancedSoundLibrary.play('wand');
      
      // Reset to playing state after 1 second
      setTimeout(() => {
        setGameState('playing');
      }, 1000);
    }
  };

  const showHintHandler = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
    enhancedSoundLibrary.play('hover');
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setStreak(0);
    setGameStarted(false);
    setCurrentSpell(null);
    setGameState('playing');
    enhancedSoundLibrary.play('pageTransition');
  };

  const navigateHome = () => {
    enhancedSoundLibrary.play('pageTransition');
    navigate('/');
  };

  useEffect(() => {
    // Start with a random spell when component mounts
    startNewRound();
  }, [startNewRound]);

  const getAccuracy = () => {
    if (attempts === 0) return 0;
    return Math.round((score / attempts) * 100);
  };

  const getHintText = () => {
    if (!currentSpell) return '';
    
    const hints = [
      `Type: ${currentSpell.type}`,
      `Difficulty: ${currentSpell.difficulty}`,
      `Effect: ${currentSpell.effect}`,
      currentSpell.etymology && `Etymology: ${currentSpell.etymology}`,
      `First letter: ${currentSpell.incantation.charAt(0).toUpperCase()}`,
      `Length: ${currentSpell.incantation.length} characters`
    ].filter(Boolean);

    return hints[hintsUsed % hints.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-950 relative overflow-hidden flex items-center justify-center">
      {/* Magical Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating magical symbols */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-300 text-2xl opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: 0
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight - 100,
                Math.random() * window.innerHeight
              ]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          >
            {['✨', '⭐', '🌟', '💫', '✦', '⚡', '🔮', '🪄'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}

        {/* Magical aurora effect */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Error Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h1 
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-500 to-blue-500 mb-4"
            animate={{
              textShadow: [
                '0 0 20px #dc2626',
                '0 0 40px #7c3aed',
                '0 0 20px #3b82f6'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          >
            404
          </motion.h1>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-amber-300 mb-4 font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🪄 Lost in the Magical Realm? 🪄
          </motion.h2>
          
          <motion.p
            className="text-xl text-purple-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            The page you're looking for has vanished like a poorly cast Vanishing Spell!
          </motion.p>

          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            But don't worry! Prove your magical knowledge by guessing the correct spell incantations,<br />
            and we'll help you find your way back to the wizarding world.
          </motion.p>
        </motion.div>

        {/* Spell Guessing Game */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-500/30 shadow-2xl"
        >
          {/* Game Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{score}</div>
              <div className="text-sm text-gray-300">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{attempts}</div>
              <div className="text-sm text-gray-300">Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">{getAccuracy()}%</div>
              <div className="text-sm text-gray-300">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{streak}</div>
              <div className="text-sm text-gray-300">Streak</div>
            </div>
          </div>

          {/* Current Spell */}
          {currentSpell && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpell.id}
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="bg-purple-900/30 rounded-2xl p-6 border border-purple-500/30 mb-6">
                  <h3 className="text-2xl font-bold text-amber-300 mb-4">
                    Spell: {currentSpell.name}
                  </h3>
                  
                  <div className="text-left space-y-3">
                    <p className="text-gray-300">
                      <span className="font-semibold text-purple-300">Effect:</span> {currentSpell.effect}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-purple-300">Description:</span> {currentSpell.description}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-purple-300">Type:</span> {currentSpell.type}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-purple-300">Difficulty:</span> {currentSpell.difficulty}
                    </p>
                    
                    {currentSpell.wandMovement && (
                      <p className="text-gray-300">
                        <span className="font-semibold text-purple-300">Wand Movement:</span> {currentSpell.wandMovement}
                      </p>
                    )}
                  </div>

                  {/* Hint Section */}
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Lightbulb className="w-5 h-5 text-yellow-400" />
                          <span className="font-semibold text-yellow-300">Hint:</span>
                        </div>
                        <p className="text-yellow-200">{getHintText()}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-2">
                      What is the incantation for this spell?
                    </label>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                        placeholder="Enter the spell incantation..."
                        className="flex-1 px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-lg"
                        disabled={gameState !== 'playing'}
                      />
                      <motion.button
                        onClick={handleGuess}
                        disabled={gameState !== 'playing' || !userGuess.trim()}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Wand2 className="w-5 h-5" />
                        <span>Cast Spell</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Game Controls */}
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={showHintHandler}
                      disabled={showHint || gameState !== 'playing'}
                      className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Hint</span>
                    </motion.button>

                    <motion.button
                      onClick={startNewRound}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>New Spell</span>
                    </motion.button>

                    <motion.button
                      onClick={resetGame}
                      className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Game State Feedback */}
          <AnimatePresence>
            {gameState === 'correct' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
              >
                <div className="bg-green-600/90 backdrop-blur-md rounded-2xl p-8 border-2 border-green-400 text-center">
                  <CheckCircle className="w-16 h-16 text-green-200 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Excellent!</h3>
                  <p className="text-green-200">You cast the spell correctly!</p>
                </div>
              </motion.div>
            )}

            {gameState === 'incorrect' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
              >
                <div className="bg-red-600/90 backdrop-blur-md rounded-2xl p-8 border-2 border-red-400 text-center">
                  <XCircle className="w-16 h-16 text-red-200 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Try Again!</h3>
                  <p className="text-red-200">The spell fizzled out. Keep practicing!</p>
                  {currentSpell && (
                    <p className="text-red-100 mt-2">
                      Correct answer: <span className="font-bold">{currentSpell.incantation}</span>
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex justify-center space-x-6 mt-12"
        >
          <motion.button
            onClick={navigateHome}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Wizarding World</span>
          </motion.button>
        </motion.div>

        {/* Achievement Message */}
        {score >= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-amber-600/20 border-2 border-amber-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Star className="w-8 h-8 text-amber-400" />
              <h3 className="text-2xl font-bold text-amber-300">Spell Master!</h3>
              <Star className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-amber-200">
              Congratulations! You've proven your magical knowledge. You're ready to return to the wizarding world!
            </p>
          </motion.div>
        )}

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 text-center"
        >
          <motion.p 
            className="text-lg italic font-serif text-purple-300 mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "It is our choices that show what we truly are, far more than our abilities."
          </motion.p>
          <p className="text-sm text-purple-400">- Albus Dumbledore</p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
