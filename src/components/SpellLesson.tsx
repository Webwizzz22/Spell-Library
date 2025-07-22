import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Zap, CheckCircle, ArrowLeft, ArrowRight, Clock, Award, Lightbulb } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { User, SpellProgress } from '../types';
import { spellsData } from '../data/spellsData';
import { soundLibrary } from './SoundManager';

interface SpellLessonProps {
  user: User | null;
  userProgress: SpellProgress[];
  onUpdateProgress: (progress: SpellProgress[]) => void;
}

const SpellLesson: React.FC<SpellLessonProps> = ({ user, userProgress, onUpdateProgress }) => {
  const { spellId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'theory' | 'example' | 'practice' | 'quiz'>('theory');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [practiceCode, setPracticeCode] = useState('');
  const [showHints, setShowHints] = useState(false);

  const spell = spellsData.find(s => s.id === spellId);
  if (!spell || !user) return null;

  // const currentProgress = userProgress.find(p => p.spellId === spellId);

  const handleQuizSubmit = () => {
    soundLibrary.play('spellCast');
    const totalQuestions = spell.content.quiz.length;
    let correctAnswers = 0;

    spell.content.quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    setQuizScore(score);
    setShowResults(true);

    // Update progress
    const newProgress = [...userProgress];
    const existingProgress = newProgress.find(p => p.spellId === spellId);

    if (existingProgress) {
      existingProgress.score = Math.max(existingProgress.score, score);
      existingProgress.completed = score >= 70;
      existingProgress.attempts += 1;
      existingProgress.xpEarned = score >= 70 ? spell.xpReward : Math.floor(spell.xpReward * 0.5);
      if (score >= 70) {
        existingProgress.completedAt = new Date();
        soundLibrary.play('achievement');
      }
    } else {
      newProgress.push({
        spellId: spellId!,
        completed: score >= 70,
        score,
        completedAt: score >= 70 ? new Date() : undefined,
        attempts: 1,
        xpEarned: score >= 70 ? spell.xpReward : Math.floor(spell.xpReward * 0.5)
      });
    }

    onUpdateProgress(newProgress);
  };

  const steps = [
    { id: 'theory', label: 'Theory', icon: BookOpen, description: 'Learn the magical concepts' },
    { id: 'example', label: 'Example', icon: Code, description: 'See the magic in action' },
    { id: 'practice', label: 'Practice', icon: Zap, description: 'Cast spells in the cauldron' },
    { id: 'quiz', label: 'Quiz', icon: CheckCircle, description: 'Test your mastery' }
  ] as const;

  const getStepIndex = () => steps.findIndex(s => s.id === currentStep);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => {
            soundLibrary.play('pageTransition');
            navigate('/dashboard');
          }}
          className="flex items-center gap-2 text-purple-300 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Spell Dashboard
        </button>

        <div className="text-center mb-8">
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            {spell.icon}
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
            {spell.name}
          </motion.h1>
          
          <p className="text-xl text-purple-200 mb-2 font-serif">{spell.topic}</p>
          <p className="text-purple-300 mb-4">{spell.description}</p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-purple-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{spell.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{spell.xpReward} XP</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyStyle(spell.difficulty)}`}>
              {spell.difficulty}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-black/40 backdrop-blur-md rounded-2xl p-3 border-2 border-purple-500/30 shadow-2xl">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = getStepIndex() > index;
            const IconComponent = step.icon;

            return (
              <motion.button
                key={step.id}
                onClick={() => {
                  soundLibrary.play('hover');
                  setCurrentStep(step.id);
                }}
                className={`relative flex flex-col items-center gap-2 px-6 py-4 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                    : isCompleted 
                    ? 'bg-gradient-to-r from-green-600/50 to-emerald-600/50 text-green-200 hover:from-green-600/70 hover:to-emerald-600/70'
                    : 'text-purple-300 hover:text-white hover:bg-purple-700/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-bold font-serif">{step.label}</span>
                </div>
                <span className="text-xs opacity-80 hidden sm:block">{step.description}</span>
                
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </motion.div>
                )}
                
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-500/30 shadow-2xl min-h-[70vh]"
        >
          {currentStep === 'theory' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-amber-300 font-serif">📚 Magical Theory</h2>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 rounded-lg text-purple-200 hover:bg-purple-600/50 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHints ? 'Hide' : 'Show'} Magical Facts
                </button>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: spell.content.theory }}
                  className="text-purple-100 [&>h2]:text-amber-300 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:mb-4 [&>h3]:text-purple-300 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:mb-3 [&>ul]:text-purple-200 [&>li]:mb-2 [&>p]:mb-4 [&>ul]:ml-6 [&>strong]:text-amber-300 [&>strong]:font-bold leading-relaxed"
                />
              </div>

              <AnimatePresence>
                {showHints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-amber-500/30"
                  >
                    <h3 className="text-xl font-bold text-amber-300 mb-4 font-serif flex items-center gap-2">
                      ✨ Magical Facts & Secrets
                    </h3>
                    <div className="space-y-3">
                      {spell.content.magicalFacts.map((fact, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-amber-200 font-serif"
                        >
                          {fact}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {currentStep === 'example' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-300 mb-6 font-serif flex items-center gap-3">
                <Code className="w-8 h-8" />
                Spell Demonstration
              </h2>
              
              <div className="bg-gray-900/80 rounded-xl border-2 border-gray-700/50 overflow-hidden shadow-2xl">
                <div className="bg-gray-800/80 px-4 py-2 border-b border-gray-700/50 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-gray-400 text-sm font-mono">spell-example.{spell.topic.includes('HTML') ? 'html' : spell.topic.includes('CSS') ? 'css' : 'js'}</span>
                </div>
                
                <Editor
                  height="500px"
                  language={spell.topic.includes('HTML') ? 'html' : spell.topic.includes('CSS') ? 'css' : 'javascript'}
                  value={spell.content.example}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    fontFamily: 'Fira Code, Monaco, monospace'
                  }}
                />
              </div>
              
              <div className="mt-6 bg-purple-900/30 rounded-xl p-6 border-2 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-300 mb-3 font-serif">🔮 What This Spell Does:</h3>
                <p className="text-purple-100 leading-relaxed">
                  This example demonstrates the core concepts of {spell.topic.toLowerCase()}. Study how each part works together to create magical web experiences. Pay attention to the structure, syntax, and the way different elements interact with each other.
                </p>
              </div>
            </div>
          )}

          {currentStep === 'practice' && (
            <div>
              <h2 className="text-3xl font-bold text-amber-300 mb-6 font-serif flex items-center gap-3">
                <Zap className="w-8 h-8" />
                Spell Cauldron - Practice Arena
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-purple-300 mb-4 font-serif">📜 Your Mission:</h3>
                  <div className="bg-purple-900/30 rounded-xl p-6 border-2 border-purple-500/30 mb-6">
                    <pre className="text-purple-100 whitespace-pre-wrap font-serif leading-relaxed">
                      {spell.content.practice}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4 font-serif">⚗️ Magical Code Cauldron:</h3>
                  <div className="bg-gray-900/80 rounded-xl border-2 border-amber-500/30 overflow-hidden shadow-2xl">
                    <div className="bg-gray-800/80 px-4 py-2 border-b border-gray-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-4 text-gray-400 text-sm font-mono">your-spell.{spell.topic.includes('HTML') ? 'html' : spell.topic.includes('CSS') ? 'css' : 'js'}</span>
                      </div>
                      <button
                        onClick={() => {
                          soundLibrary.play('spellCast');
                          // In a real app, you'd execute/preview the code here
                          alert('🎉 Spell cast successfully! Your magic is working!');
                        }}
                        className="px-4 py-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded text-white text-sm font-bold hover:from-green-500 hover:to-emerald-500 transition-all duration-300"
                      >
                        Cast Spell! ⚡
                      </button>
                    </div>
                    
                    <Editor
                      height="400px"
                      language={spell.topic.includes('HTML') ? 'html' : spell.topic.includes('CSS') ? 'css' : 'javascript'}
                      value={practiceCode}
                      onChange={(value) => setPracticeCode(value || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        fontFamily: 'Fira Code, Monaco, monospace',
                        wordWrap: 'on'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'quiz' && !showResults && (
            <div>
              <h2 className="text-3xl font-bold text-amber-300 mb-6 font-serif flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                Spell Mastery Examination
              </h2>
              
              <div className="space-y-8">
                {spell.content.quiz.map((question, qIndex) => (
                  <motion.div 
                    key={question.id} 
                    className="bg-purple-900/30 rounded-xl p-6 border-2 border-purple-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIndex * 0.1 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${getDifficultyColor(question.difficulty)}`}>
                        {qIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-4 font-serif leading-relaxed">
                          {question.question}
                        </h3>
                        <div className="space-y-3">
                          {question.options.map((option, oIndex) => (
                            <label
                              key={oIndex}
                              className="flex items-center gap-3 p-4 rounded-lg bg-black/30 hover:bg-black/50 transition-colors cursor-pointer group border-2 border-transparent hover:border-purple-500/30"
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={oIndex}
                                onChange={() => {
                                  soundLibrary.play('hover');
                                  setQuizAnswers({
                                    ...quizAnswers,
                                    [question.id]: oIndex
                                  });
                                }}
                                className="text-purple-600 focus:ring-purple-500 w-4 h-4"
                              />
                              <span className="text-purple-100 group-hover:text-white transition-colors font-serif">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length !== spell.content.quiz.length}
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl text-black font-bold text-lg hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl font-serif"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Spell Examination & Complete Quest
                </motion.button>
              </div>
            </div>
          )}

          {currentStep === 'quiz' && showResults && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                {quizScore >= 70 ? (
                  <div>
                    <motion.div
                      className="text-8xl mb-6"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    >
                      🏆
                    </motion.div>
                    <h2 className="text-4xl font-bold text-green-400 mb-4 font-serif">Spell Mastered! 🎉</h2>
                    <p className="text-xl text-green-200 mb-6 font-serif">
                      Congratulations, {user.name}! You've successfully mastered the {spell.name} spell and proven your magical prowess!
                    </p>
                    <div className="bg-green-900/30 rounded-xl p-6 border-2 border-green-500/50 mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-green-300">{quizScore}%</p>
                          <p className="text-green-200 font-serif">Final Score</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-amber-300">{spell.xpReward}</p>
                          <p className="text-amber-200 font-serif">XP Earned</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-purple-300">{spell.difficulty}</p>
                          <p className="text-purple-200 font-serif">Difficulty</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <motion.div
                      className="text-8xl mb-6"
                      animate={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 0.9, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    >
                      📚
                    </motion.div>
                    <h2 className="text-4xl font-bold text-yellow-400 mb-4 font-serif">More Practice Needed</h2>
                    <p className="text-xl text-yellow-200 mb-6 font-serif">
                      Don't worry, {user.name}! Even the greatest wizards need practice. Review the material and try again!
                    </p>
                    <div className="bg-yellow-900/30 rounded-xl p-6 border-2 border-yellow-500/50 mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-yellow-300">{quizScore}%</p>
                          <p className="text-yellow-200 font-serif">Your Score</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-purple-300">70%</p>
                          <p className="text-purple-200 font-serif">Needed to Pass</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show explanations */}
                <div className="text-left space-y-4 mb-8">
                  <h3 className="text-2xl font-bold text-amber-300 font-serif">📖 Spell Review & Explanations:</h3>
                  {spell.content.quiz.map((question, qIndex) => {
                    const userAnswer = quizAnswers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <motion.div 
                        key={question.id} 
                        className="bg-black/30 rounded-xl p-6 border-2 border-purple-500/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: qIndex * 0.1 }}
                      >
                        <p className="font-bold text-white mb-3 font-serif">
                          {qIndex + 1}. {question.question}
                        </p>
                        <p className={`mb-3 font-serif ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                          Your answer: {question.options[userAnswer]} {isCorrect ? '✅' : '❌'}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-300 mb-3 font-serif">
                            Correct answer: {question.options[question.correctAnswer]} ✅
                          </p>
                        )}
                        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                          <p className="text-purple-200 text-sm font-serif leading-relaxed">
                            <strong className="text-amber-300">Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      soundLibrary.play('pageTransition');
                      navigate('/dashboard');
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-bold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 font-serif"
                  >
                    Return to Spell Dashboard
                  </button>
                  
                  {quizScore < 70 && (
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setQuizAnswers({});
                        setCurrentStep('theory');
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl text-black font-bold hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 font-serif"
                    >
                      Study Again
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {!showResults && (
        <div className="flex justify-between mt-8">
          <button
            onClick={() => {
              const currentIndex = getStepIndex();
              if (currentIndex > 0) {
                soundLibrary.play('hover');
                setCurrentStep(steps[currentIndex - 1].id);
              }
            }}
            disabled={getStepIndex() === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 rounded-xl text-white hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Step
          </button>

          <button
            onClick={() => {
              const currentIndex = getStepIndex();
              if (currentIndex < steps.length - 1) {
                soundLibrary.play('hover');
                setCurrentStep(steps[currentIndex + 1].id);
              }
            }}
            disabled={getStepIndex() === steps.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-serif"
          >
            Next Step
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-600/20 text-green-300 border-green-500/30';
    case 'intermediate': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
    case 'advanced': return 'bg-red-600/20 text-red-300 border-red-500/30';
    default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-600';
    case 'medium': return 'bg-yellow-600';
    case 'hard': return 'bg-red-600';
    default: return 'bg-purple-600';
  }
};

export default SpellLesson;