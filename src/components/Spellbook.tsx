'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Clock, Award, TrendingUp, Target, Zap, Trophy } from 'lucide-react';
import { User, SpellProgress } from '../types';
import { spellsData } from '../data/spellsData';

interface SpellbookProps {
  user: User | null;
  userProgress: SpellProgress[];
}

const Spellbook: React.FC<SpellbookProps> = ({ user, userProgress }) => {
  if (!user) return null;

  const completedSpells = userProgress.filter(p => p.completed);
  const totalXP = completedSpells.reduce((sum, progress) => {
    return sum + (progress.xpEarned || 0);
  }, 0);

  const averageScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((sum, p) => sum + p.score, 0) / userProgress.length)
    : 0;

  const getSpellsByDifficulty = (difficulty: string) => {
    return completedSpells.filter(progress => {
      const spell = spellsData.find(s => s.id === progress.spellId);
      return spell?.difficulty === difficulty;
    }).length;
  };

  const achievements = [
    {
      id: 'first-spell',
      name: 'First Steps',
      description: 'Complete your first spell',
      icon: '🌟',
      unlocked: completedSpells.length >= 1,
      rarity: 'common'
    },
    {
      id: 'spell-master',
      name: 'Spell Master',
      description: 'Complete 3 spells',
      icon: '🎓',
      unlocked: completedSpells.length >= 3,
      rarity: 'rare'
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Score 100% on any spell',
      icon: '💎',
      unlocked: userProgress.some(p => p.score === 100),
      rarity: 'legendary'
    },
    {
      id: 'xp-collector',
      name: 'XP Collector',
      description: 'Earn 500+ total XP',
      icon: '⚡',
      unlocked: totalXP >= 500,
      rarity: 'rare'
    }
  ];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            rotateY: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          📖
        </motion.div>
        
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
          {user.name}'s Magical Spellbook
        </motion.h1>
        
        <p className="text-xl text-purple-200 font-serif">
          Chronicle of your magical journey through web development
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        <motion.div 
          className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border-2 border-purple-500/30 text-center relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Star className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <div className="text-4xl font-bold text-amber-300 mb-1">{completedSpells.length}</div>
          <div className="text-purple-200 font-serif">Spells Mastered</div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-400/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-6 border-2 border-green-500/30 text-center relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <TrendingUp className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <div className="text-4xl font-bold text-green-300 mb-1">{totalXP}</div>
          <div className="text-green-200 font-serif">Total Experience</div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl p-6 border-2 border-blue-500/30 text-center relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Award className="w-10 h-10 text-blue-400 mx-auto mb-3" />
          <div className="text-4xl font-bold text-blue-300 mb-1">{averageScore}%</div>
          <div className="text-blue-200 font-serif">Average Score</div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-2xl p-6 border-2 border-orange-500/30 text-center relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Target className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <div className="text-4xl font-bold text-orange-300 mb-1">{user.level}</div>
          <div className="text-orange-200 font-serif">Wizard Level</div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-amber-300 mb-8 font-serif flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          Magical Achievements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-6 rounded-2xl border-2 text-center relative overflow-hidden ${
                achievement.unlocked
                  ? `bg-gradient-to-br ${getRarityGradient(achievement.rarity)} ${getRarityBorder(achievement.rarity)}`
                  : 'bg-gray-800/50 border-gray-600/50'
              }`}
            >
              <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                {achievement.icon}
              </div>
              <h3 className={`text-lg font-bold mb-2 font-serif ${
                achievement.unlocked ? getRarityTextColor(achievement.rarity) : 'text-gray-400'
              }`}>
                {achievement.name}
              </h3>
              <p className={`text-sm ${
                achievement.unlocked ? 'text-white' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
              
              {achievement.unlocked && (
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Star className="w-3 h-3 text-white" />
                </motion.div>
              )}
              
              {!achievement.unlocked && (
                <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                  <div className="text-gray-400 text-sm font-bold">🔒 Locked</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Spell Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-500/30 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-amber-300 mb-8 font-serif flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          Spell Mastery Chronicle
        </h2>

        {/* Difficulty Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-900/30 rounded-xl p-6 border-2 border-green-500/30 text-center">
            <div className="text-3xl font-bold text-green-300 mb-2">{getSpellsByDifficulty('beginner')}</div>
            <div className="text-green-200 font-serif">Beginner Spells</div>
          </div>
          <div className="bg-yellow-900/30 rounded-xl p-6 border-2 border-yellow-500/30 text-center">
            <div className="text-3xl font-bold text-yellow-300 mb-2">{getSpellsByDifficulty('intermediate')}</div>
            <div className="text-yellow-200 font-serif">Intermediate Spells</div>
          </div>
          <div className="bg-red-900/30 rounded-xl p-6 border-2 border-red-500/30 text-center">
            <div className="text-3xl font-bold text-red-300 mb-2">{getSpellsByDifficulty('advanced')}</div>
            <div className="text-red-200 font-serif">Advanced Spells</div>
          </div>
        </div>

        <div className="space-y-6">
          {spellsData.map((spell, index) => {
            const progress = userProgress.find(p => p.spellId === spell.id);
            const isCompleted = progress?.completed || false;
            const score = progress?.score || 0;
            const attempts = progress?.attempts || 0;

            return (
              <motion.div
                key={spell.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/50 shadow-lg shadow-green-500/10' 
                    : progress 
                    ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/50'
                    : 'bg-gradient-to-r from-gray-900/40 to-slate-900/40 border-gray-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 ${
                        isCompleted 
                          ? 'bg-green-600 border-green-400' 
                          : progress 
                          ? 'bg-yellow-600 border-yellow-400' 
                          : 'bg-gray-600 border-gray-400'
                      }`}
                    >
                      {isCompleted ? '✨' : progress ? '📖' : '🔒'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white font-serif">{spell.name}</h3>
                      <p className="text-purple-200 font-serif">{spell.topic}</p>
                      <p className="text-purple-300 text-sm">{spell.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {isCompleted && (
                      <div className="text-green-300 font-bold text-xl font-serif mb-2">
                        ⭐ Mastered!
                      </div>
                    )}
                    {progress && (
                      <div className="text-sm text-purple-200 space-y-1">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>Score: {score}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>Attempts: {attempts}</span>
                        </div>
                        {progress.xpEarned && (
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            <span>XP: {progress.xpEarned}</span>
                          </div>
                        )}
                        {progress.completedAt && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Completed: {new Date(progress.completedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {!progress && (
                      <div className="text-gray-400 font-serif">
                        Not started
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {progress && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span className="font-serif">Mastery Progress</span>
                      <span>{score}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-3 border border-gray-600/50">
                      <motion.div
                        className={`h-3 rounded-full relative overflow-hidden ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.5, delay: 1 + index * 0.1 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Magical glow effect for completed spells */}
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedSpells.length === spellsData.length && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8, delay: 2 }}
            className="mt-12 text-center bg-gradient-to-r from-amber-900/50 to-yellow-900/50 rounded-2xl p-8 border-2 border-amber-500/50 relative overflow-hidden"
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🏆
            </motion.div>
            <h3 className="text-4xl font-bold text-amber-300 mb-4 font-serif">
              Congratulations, Grand Master Wizard!
            </h3>
            <p className="text-xl text-amber-200 mb-4 font-serif">
              You have mastered all available spells in SpellAcademia and achieved the highest rank of magical mastery!
            </p>
            <p className="text-purple-300 font-serif">
              Your journey through web development magic is complete, but remember - a true wizard never stops learning. 
              More advanced spells and magical challenges await in your future adventures...
            </p>
            
            {/* Celebration particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  x: Math.cos(i * 30 * Math.PI / 180) * 150,
                  y: Math.sin(i * 30 * Math.PI / 180) * 150,
                  scale: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  delay: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const getRarityGradient = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'from-gray-700/50 to-gray-800/50';
    case 'rare': return 'from-blue-700/50 to-purple-800/50';
    case 'legendary': return 'from-yellow-600/50 to-orange-700/50';
    default: return 'from-gray-700/50 to-gray-800/50';
  }
};

const getRarityBorder = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-gray-500/50';
    case 'rare': return 'border-blue-500/50';
    case 'legendary': return 'border-yellow-500/50';
    default: return 'border-gray-500/50';
  }
};

const getRarityTextColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'text-gray-300';
    case 'rare': return 'text-blue-300';
    case 'legendary': return 'text-yellow-300';
    default: return 'text-gray-300';
  }
};

export default Spellbook;