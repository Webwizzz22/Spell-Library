'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Star, Zap, BookOpen, Code, Layout, Palette, Clock, Award, TrendingUp } from 'lucide-react';
import type { User, SpellProgress, Spell } from '../types';
import { spellsData } from '../data/spellsData';
import { soundLibrary } from './SoundManager';

interface SpellDashboardProps {
  user: User;
  userProgress: SpellProgress[];
}

const SpellDashboard: React.FC<SpellDashboardProps> = ({ user, userProgress }) => {
  if (!user) return null;

  const getSpellProgress = (spellId: string) => {
    return userProgress.find(p => p.spellId === spellId);
  };

  const isSpellUnlocked = (spell: Spell, index: number) => {eact from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Star, Zap, BookOpen, Code, Layout, Palette, Clock, Award, TrendingUp } from 'lucide-react';
import { User, SpellProgress } from '../types';
import { spellsData } from '../data/spellsData';
import { soundLibrary } from './SoundManager';

interface SpellDashboardProps {
  user: User | null;
  userProgress: SpellProgress[];
}

const SpellDashboard: React.FC<SpellDashboardProps> = ({ user, userProgress }) => {
  if (!user) return null;

  const getSpellProgress = (spellId: string) => {
    return userProgress.find(p => p.spellId === spellId);
  };

  const isSpellUnlocked = (spell: any, index: number) => {
    if (index === 0) return true;
    if (!spell.prerequisites) return true;
    
    return spell.prerequisites.every((prereqId: string) => {
      const progress = getSpellProgress(prereqId);
      return progress?.completed;
    });
  };

  const getSpellIcon = (topic: string) => {
    switch (topic) {
      case 'HTML Basics': return Code;
      case 'CSS Selectors': return Palette;
      case 'Flexbox/Grid': return Layout;
      case 'DOM Manipulation': return Zap;
      case 'JavaScript Logic': return BookOpen;
      case 'Responsive Design': return Star;
      default: return Zap;
    }
  };

  const completedSpells = userProgress.filter(p => p.completed).length;
  const totalSpells = spellsData.length;
  const progressPercentage = (completedSpells / totalSpells) * 100;

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 mb-4 font-serif"
          animate={{
            textShadow: [
              '0 0 20px #fbbf24',
              '0 0 40px #fbbf24',
              '0 0 20px #fbbf24'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          Welcome back, {user.name}! ⚡
        </motion.h1>
        
        <motion.p 
          className="text-xl text-purple-200 mb-8 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Continue your magical journey through the art of web development
        </motion.p>
        
        {/* Progress Overview */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div 
            className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl p-6 border-2 border-purple-500/30 text-center relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-300">{user.level}</div>
            <div className="text-purple-200 font-serif">Wizard Level</div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-indigo-400/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 rounded-xl p-6 border-2 border-amber-500/30 text-center relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Award className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-300">{user.totalXP}</div>
            <div className="text-amber-200 font-serif">Experience Points</div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-400/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-6 border-2 border-green-500/30 text-center relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-300">{completedSpells}</div>
            <div className="text-green-200 font-serif">Spells Mastered</div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border-2 border-blue-500/30 text-center relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-blue-300">{Math.round(progressPercentage)}%</div>
            <div className="text-blue-200 font-serif">Journey Complete</div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Overall Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black/30 backdrop-blur-md rounded-xl p-6 border-2 border-purple-500/30 mb-8"
        >
          <h3 className="text-lg font-bold text-amber-300 mb-4 font-serif">Your Magical Progress</h3>
          <div className="w-full bg-purple-900/30 rounded-full h-4 border border-purple-500/30">
            <motion.div
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 h-4 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          <p className="text-purple-200 text-sm mt-2 font-serif">
            {completedSpells} of {totalSpells} spells mastered
          </p>
        </motion.div>
      </motion.div>

      {/* Spells Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {spellsData.map((spell, index) => {
          const progress = getSpellProgress(spell.id);
          const isUnlocked = isSpellUnlocked(spell, index);
          const IconComponent = getSpellIcon(spell.topic);

          return (
            <motion.div
              key={spell.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {isUnlocked ? (
                <Link 
                  to={`/spell/${spell.id}`}
                  onMouseEnter={() => soundLibrary.play('hover')}
                  onClick={() => soundLibrary.play('spellCast')}
                >
                  <motion.div 
                    className={`relative bg-gradient-to-br ${getHouseGradient(spell.house)} rounded-2xl p-8 border-2 border-purple-500/30 hover:border-amber-400/60 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl`}
                    whileHover={{
                      boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4), 0 0 30px rgba(251, 191, 36, 0.3)'
                    }}
                  >
                    {/* Progress Badge */}
                    {progress?.completed && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-green-300 shadow-lg"
                      >
                        <Star className="w-5 h-5 text-white" />
                      </motion.div>
                    )}

                    {/* Spell Icon */}
                    <motion.div 
                      className="flex items-center justify-center w-20 h-20 bg-black/40 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-amber-400/30 relative overflow-hidden"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <IconComponent className="w-10 h-10 text-amber-300 relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>

                    {/* Spell Info */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors font-serif">
                      {spell.name}
                    </h3>
                    <p className="text-purple-200 text-sm mb-2 font-serif">{spell.topic}</p>
                    <p className="text-purple-300 text-sm mb-6 leading-relaxed">{spell.description}</p>

                    {/* Spell Details */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold text-lg">{spell.xpReward} XP</span>
                        <span className="text-purple-300">•</span>
                        <span className="text-purple-300 text-sm">{spell.estimatedTime}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyStyle(spell.difficulty)}`}>
                        {spell.difficulty}
                      </span>
                    </div>

                    {/* Progress Bar for Incomplete Spells */}
                    {progress && !progress.completed && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-purple-200 mb-1">
                          <span>Progress</span>
                          <span>{progress.score}%</span>
                        </div>
                        <div className="w-full bg-purple-900/50 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.score}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Magical Hover Effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-yellow-400/10 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      animate={{
                        background: [
                          'linear-gradient(45deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.05))',
                          'linear-gradient(225deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.05))',
                          'linear-gradient(45deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.05))'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Floating sparkles on hover */}
                    <motion.div
                      className="absolute top-2 left-2 text-amber-400 opacity-0 group-hover:opacity-100"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      className="absolute bottom-2 right-2 text-purple-400 opacity-0 group-hover:opacity-100"
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, -180, -360]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      ⭐
                    </motion.div>
                  </motion.div>
                </Link>
              ) : (
                <motion.div 
                  className="bg-gray-800/50 rounded-2xl p-8 border-2 border-gray-700/50 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-gray-400 font-bold text-lg font-serif">Spell Locked</p>
                      <p className="text-gray-500 text-sm mt-2">Complete prerequisites to unlock</p>
                      {spell.prerequisites && (
                        <div className="mt-4">
                          <p className="text-gray-500 text-xs mb-2">Required spells:</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {spell.prerequisites.map(prereqId => {
                              const prereqSpell = spellsData.find(s => s.id === prereqId);
                              return (
                                <span key={prereqId} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-400">
                                  {prereqSpell?.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="opacity-30">
                    <div className="flex items-center justify-center w-20 h-20 bg-gray-700 rounded-full mb-6">
                      <IconComponent className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-3 font-serif">{spell.name}</h3>
                    <p className="text-gray-500 text-sm mb-6">{spell.description}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-16 bg-black/30 backdrop-blur-md rounded-2xl p-8 border-2 border-purple-500/30"
      >
        <motion.p 
          className="text-lg italic text-purple-200 font-serif mb-2"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          "Happiness can be found even in the darkest of times, if one only remembers to turn on the light."
        </motion.p>
        <p className="text-sm text-purple-400">- Albus Dumbledore</p>
      </motion.div>
    </div>
  );
};

const getHouseGradient = (house: string) => {
  switch (house) {
    case 'gryffindor': return 'from-red-900/80 via-red-800/60 to-yellow-800/80';
    case 'hufflepuff': return 'from-yellow-700/80 via-yellow-600/60 to-yellow-900/80';
    case 'ravenclaw': return 'from-blue-900/80 via-blue-800/60 to-indigo-900/80';
    case 'slytherin': return 'from-green-900/80 via-green-800/60 to-emerald-800/80';
    default: return 'from-purple-900/80 via-purple-800/60 to-indigo-900/80';
  }
};

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-600/20 text-green-300 border-green-500/30';
    case 'intermediate': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
    case 'advanced': return 'bg-red-600/20 text-red-300 border-red-500/30';
    default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
  }
};

export default SpellDashboard;