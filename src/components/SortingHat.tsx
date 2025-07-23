'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';
import { soundLibrary } from './SoundManager';

interface SortingHatProps {
  userName: string;
  onSorted: (house: User['house']) => void;
}

const questions = [
  {
    question: "Which quality do you value most in web development?",
    answers: [
      { text: "Courage to try new technologies and push boundaries", house: 'gryffindor' },
      { text: "Patience and dedication to write clean, maintainable code", house: 'hufflepuff' },
      { text: "Intelligence and creativity in solving complex problems", house: 'ravenclaw' },
      { text: "Ambition to build powerful, efficient applications", house: 'slytherin' }
    ]
  },
  {
    question: "When facing a challenging coding bug, you:",
    answers: [
      { text: "Tackle it head-on with determination and bold solutions", house: 'gryffindor' },
      { text: "Methodically work through it step by step with persistence", house: 'hufflepuff' },
      { text: "Research thoroughly and analyze the problem from all angles", house: 'ravenclaw' },
      { text: "Find the most strategic and efficient path to resolution", house: 'slytherin' }
    ]
  },
  {
    question: "Your ideal coding environment is:",
    answers: [
      { text: "Dynamic and full of exciting challenges to conquer", house: 'gryffindor' },
      { text: "Collaborative and supportive with helpful teammates", house: 'hufflepuff' },
      { text: "Quiet and focused, perfect for deep thinking", house: 'ravenclaw' },
      { text: "Competitive and results-driven with clear goals", house: 'slytherin' }
    ]
  },
  {
    question: "Which magical coding power would you choose?",
    answers: [
      { text: "The ability to debug any code with fearless intuition", house: 'gryffindor' },
      { text: "The power to write code that never breaks or causes issues", house: 'hufflepuff' },
      { text: "The wisdom to understand any codebase instantly", house: 'ravenclaw' },
      { text: "The skill to optimize any application for maximum performance", house: 'slytherin' }
    ]
  }
];

const houseDescriptions = {
  gryffindor: {
    name: "Gryffindor",
    description: "Bold and daring developers who aren't afraid to try new technologies and take on challenging projects.",
    colors: { primary: '#740001', secondary: '#D3A625', bg: 'from-red-900 to-yellow-800' },
    traits: ["Brave", "Determined", "Innovative", "Bold"]
  },
  hufflepuff: {
    name: "Hufflepuff", 
    description: "Patient and dedicated developers who write clean, maintainable code and work well in teams.",
    colors: { primary: '#ECB939', secondary: '#372E29', bg: 'from-yellow-700 to-yellow-900' },
    traits: ["Patient", "Loyal", "Hardworking", "Reliable"]
  },
  ravenclaw: {
    name: "Ravenclaw",
    description: "Intelligent and creative developers who love solving complex problems and learning new concepts.",
    colors: { primary: '#0E1A40', secondary: '#946B2D', bg: 'from-blue-900 to-indigo-900' },
    traits: ["Intelligent", "Creative", "Analytical", "Curious"]
  },
  slytherin: {
    name: "Slytherin",
    description: "Ambitious and strategic developers who build powerful, efficient applications and lead teams to success.",
    colors: { primary: '#1A472A', secondary: '#AAAAAA', bg: 'from-green-900 to-emerald-800' },
    traits: ["Ambitious", "Strategic", "Efficient", "Leadership"]
  }
};

const SortingHat: React.FC<SortingHatProps> = ({ userName, onSorted }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [finalHouse, setFinalHouse] = useState<User['house'] | null>(null);

  const handleAnswer = (housePreference: string) => {
    soundLibrary.play('spellCast');
    const newAnswers = [...answers, housePreference];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      // Calculate house based on answers
      const houseCounts: Record<string, number> = {};
      newAnswers.forEach(answer => {
        houseCounts[answer] = (houseCounts[answer] || 0) + 1;
      });

      const sortedHouse = Object.keys(houseCounts).reduce((a, b) => 
        houseCounts[a] > houseCounts[b] ? a : b
      ) as User['house'];

      setTimeout(() => {
        setIsRevealing(true);
        setFinalHouse(sortedHouse);
        setTimeout(() => onSorted(sortedHouse), 4000);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto bg-black/50 backdrop-blur-md rounded-3xl p-8 border-2 border-amber-500/40 shadow-2xl"
    >
      <AnimatePresence mode="wait">
        {!isRevealing ? (
          <motion.div
            key={currentQuestion}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              {/* Animated Sorting Hat */}
              <motion.div
                className="text-8xl mb-6 relative"
                animate={{ 
                  rotateY: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                🎓
                {/* Magical sparkles around hat */}
                <motion.div
                  className="absolute -top-2 -right-2 text-lg"
                  animate={{ 
                    rotate: 360,
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 text-lg"
                  animate={{ 
                    rotate: -360,
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 1
                  }}
                >
                  ⭐
                </motion.div>
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold text-amber-300 mb-4 font-serif"
                animate={{
                  textShadow: [
                    '0 0 10px #fbbf24',
                    '0 0 20px #fbbf24',
                    '0 0 10px #fbbf24'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                The Sorting Hat Speaks...
              </motion.h2>
              
              {/* Progress Bar */}
              <div className="w-full bg-purple-900/30 rounded-full h-3 mb-8 border border-purple-500/30">
                <motion.div 
                  className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 h-3 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              
              <p className="text-purple-300 text-sm mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <motion.h3 
              className="text-xl md:text-2xl text-white mb-8 text-center font-serif leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              "{questions[currentQuestion].question}"
            </motion.h3>

            <div className="space-y-4">
              {questions[currentQuestion].answers.map((answer, index) => (
                <motion.button
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => handleAnswer(answer.house)}
                  onMouseEnter={() => soundLibrary.play('hover')}
                  className="w-full text-left p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-500/30 rounded-xl text-white hover:from-purple-800/50 hover:to-indigo-800/50 hover:border-amber-400/60 transition-all duration-300 transform hover:scale-[1.02] hover:translate-x-2 group"
                  whileHover={{ 
                    boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4), 0 0 20px rgba(251, 191, 36, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg leading-relaxed pr-4">{answer.text}</span>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 text-amber-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            {/* Dramatic Hat Animation */}
            <motion.div
              className="text-9xl mb-8 relative"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1.1]
              }}
              transition={{ 
                duration: 3,
                ease: "easeInOut"
              }}
            >
              🎓
              {/* Explosion of sparkles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    x: Math.cos(i * 45 * Math.PI / 180) * 100,
                    y: Math.sin(i * 45 * Math.PI / 180) * 100,
                    scale: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: "easeOut"
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>

            <motion.h2 
              className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 font-serif"
              animate={{
                textShadow: [
                  '0 0 20px #fbbf24',
                  '0 0 40px #fbbf24',
                  '0 0 20px #fbbf24'
                ]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              {userName}!
            </motion.h2>

            {finalHouse && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className={`bg-gradient-to-br ${houseDescriptions[finalHouse].colors.bg} rounded-2xl p-8 border-2 border-amber-400/50 shadow-2xl mb-6`}
              >
                <motion.h3 
                  className="text-4xl font-bold mb-4 capitalize font-serif"
                  style={{ color: houseDescriptions[finalHouse].colors.secondary }}
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  Welcome to {houseDescriptions[finalHouse].name}!
                </motion.h3>
                
                <motion.p
                  className="text-lg text-white mb-6 font-serif leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {houseDescriptions[finalHouse].description}
                </motion.p>
                
                <motion.div
                  className="flex flex-wrap justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  {houseDescriptions[finalHouse].traits.map((trait, index) => (
                    <motion.span
                      key={trait}
                      className="px-4 py-2 bg-black/30 rounded-full text-amber-300 font-bold text-sm border border-amber-400/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2 + index * 0.1 }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}

            <motion.p
              className="text-lg text-purple-200 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              Preparing to enter your magical coding academy...
            </motion.p>

            <motion.div
              className="mt-6 flex justify-center text-4xl"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              🌟
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SortingHat;