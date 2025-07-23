'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Lock, 
  CheckCircle, 
  Star, 
  Users, 
  ArrowRight, 
  Book,
  Wand2,
  Castle,
  ShoppingBag,
  Trees,
  Building
} from 'lucide-react';
import { enhancedSoundLibrary } from './SoundManager';
import { User, Location, JourneyStep, SpellProgress } from '../types';

interface JourneyProps {
  user: User;
  userProgress: SpellProgress[];
}

// Journey steps data
const journeySteps: JourneyStep[] = [
  {
    id: 'diagon-alley',
    title: 'Diagon Alley',
    description: 'Begin your magical journey in the famous wizarding shopping district',
    location: 'diagon-alley',
    characters: ['hagrid', 'ollivander', 'tom-innkeeper'],
    rewards: { xp: 100, achievements: ['first-steps'] },
    completed: false,
    unlocked: true
  },
  {
    id: 'platform-9-3-4',
    title: 'Platform 9¾',
    description: 'Discover the secret entrance to the Hogwarts Express',
    location: 'kings-cross',
    characters: ['molly-weasley', 'percy-weasley'],
    rewards: { xp: 150 },
    completed: false,
    unlocked: false
  },
  {
    id: 'hogwarts-express',
    title: 'Hogwarts Express',
    description: 'Take the magical train journey to Hogwarts School',
    location: 'hogwarts-express',
    characters: ['trolley-witch', 'hermione-granger', 'ron-weasley'],
    rewards: { xp: 200 },
    completed: false,
    unlocked: false
  },
  {
    id: 'great-hall',
    title: 'The Great Hall',
    description: 'Experience the grandeur of Hogwarts and witness the Sorting Ceremony',
    location: 'great-hall',
    characters: ['albus-dumbledore', 'minerva-mcgonagall', 'sorting-hat'],
    rewards: { xp: 250, achievements: ['hogwarts-arrival'] },
    completed: false,
    unlocked: false
  },
  {
    id: 'common-room',
    title: 'House Common Room',
    description: 'Settle into your house common room and meet your housemates',
    location: 'common-room',
    characters: ['house-ghost', 'prefects'],
    rewards: { xp: 150 },
    completed: false,
    unlocked: false
  },
  {
    id: 'potions-dungeon',
    title: 'Potions Dungeon',
    description: 'Brave your first Potions lesson with Professor Snape',
    location: 'potions-classroom',
    characters: ['severus-snape'],
    requiredSpells: ['basic-potion-brewing'],
    rewards: { xp: 300 },
    completed: false,
    unlocked: false
  },
  {
    id: 'forbidden-forest',
    title: 'Forbidden Forest',
    description: 'Venture into the dangerous Forbidden Forest on a daring mission',
    location: 'forbidden-forest',
    characters: ['hagrid', 'centaurs', 'aragog'],
    requiredSpells: ['lumos', 'protego'],
    rewards: { xp: 400, achievements: ['forest-explorer'] },
    completed: false,
    unlocked: false
  },
  {
    id: 'chamber-of-secrets',
    title: 'Chamber of Secrets',
    description: 'Discover the legendary Chamber and face the Basilisk',
    location: 'chamber-of-secrets',
    characters: ['tom-riddle', 'fawkes'],
    requiredSpells: ['expelliarmus', 'phoenix-healing'],
    rewards: { xp: 500, achievements: ['chamber-discoverer'] },
    completed: false,
    unlocked: false
  },
  {
    id: 'ministry-of-magic',
    title: 'Ministry of Magic',
    description: 'Visit the heart of magical government and witness justice',
    location: 'ministry-of-magic',
    characters: ['arthur-weasley', 'cornelius-fudge'],
    rewards: { xp: 350 },
    completed: false,
    unlocked: false
  },
  {
    id: 'final-battle',
    title: 'Battle of Hogwarts',
    description: 'Join the ultimate battle between good and evil',
    location: 'hogwarts-grounds',
    characters: ['harry-potter', 'voldemort', 'order-members'],
    requiredSpells: ['expecto-patronum', 'protego-maxima'],
    rewards: { xp: 1000, achievements: ['defender-of-hogwarts'] },
    completed: false,
    unlocked: false
  }
];

// Locations data
const locations: Location[] = [
  {
    id: 'diagon-alley',
    name: 'Diagon Alley',
    type: 'shop',
    description: 'The magical shopping district hidden behind the Leaky Cauldron in London.',
    imageUrl: '/images/locations/diagon-alley.jpg',
    significance: 'Where young witches and wizards get their school supplies and first taste of the wizarding world.',
    notableEvents: [
      'Harry\'s first visit with Hagrid',
      'Meeting Professor Quirrell',
      'Choosing Harry\'s wand at Ollivanders'
    ],
    theme: 'diagon-alley-theme',
    interactiveElements: [
      { type: 'hover', element: 'shops', effect: 'glow' },
      { type: 'click', element: 'ollivanders', effect: 'wand-selection' }
    ]
  },
  {
    id: 'great-hall',
    name: 'The Great Hall',
    type: 'school',
    description: 'The magnificent dining hall of Hogwarts School of Witchcraft and Wizardry.',
    imageUrl: '/images/locations/great-hall.jpg',
    significance: 'The heart of Hogwarts where students gather for meals and important ceremonies.',
    notableEvents: [
      'The Sorting Ceremony',
      'Start-of-term feasts',
      'Triwizard Tournament announcements'
    ],
    theme: 'great-hall-theme'
  },
  {
    id: 'forbidden-forest',
    name: 'Forbidden Forest',
    type: 'magical_place',
    description: 'A dark, dense forest on the grounds of Hogwarts, forbidden to students.',
    imageUrl: '/images/locations/forbidden-forest.jpg',
    significance: 'Home to dangerous magical creatures and site of many adventures.',
    notableEvents: [
      'Detention with Hagrid',
      'Meeting the centaurs',
      'Aragog\'s lair'
    ],
    residents: ['Hagrid', 'Centaurs', 'Acromantulas'],
    theme: 'forbidden-forest-theme'
  }
];

const Journey: React.FC<JourneyProps> = () => {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentView, setCurrentView] = useState<'journey' | 'locations'>('journey');
  const [journeyProgress, setJourneyProgress] = useState<JourneyStep[]>(journeySteps);

  useEffect(() => {
    // Load journey progress from localStorage
    const savedProgress = localStorage.getItem('journeyProgress');
    if (savedProgress) {
      setJourneyProgress(JSON.parse(savedProgress));
    }
  }, []);

  const handleStepComplete = (stepId: string) => {
    const updatedProgress = journeyProgress.map(step => {
      if (step.id === stepId) {
        return { ...step, completed: true };
      }
      return step;
    });

    // Unlock next step
    const currentIndex = journeyProgress.findIndex(step => step.id === stepId);
    if (currentIndex < journeyProgress.length - 1) {
      updatedProgress[currentIndex + 1].unlocked = true;
    }

    setJourneyProgress(updatedProgress);
    localStorage.setItem('journeyProgress', JSON.stringify(updatedProgress));
    enhancedSoundLibrary.play('achievement');
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'school': return Castle;
      case 'shop': return ShoppingBag;
      case 'magical_place': return Trees;
      case 'ministry': return Building;
      default: return MapPin;
    }
  };

  const getStepProgress = () => {
    const completedSteps = journeyProgress.filter(step => step.completed).length;
    return (completedSteps / journeyProgress.length) * 100;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
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
          🗺️ Magical Journey 🏰
        </motion.h1>
        
        <motion.p 
          className="text-xl text-purple-200 mb-8 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore the wizarding world through iconic locations and memorable moments
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-500/30 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Journey Progress</h3>
            <span className="text-purple-300">{Math.round(getStepProgress())}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <motion.div
              className="h-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400"
              animate={{ width: `${getStepProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* View Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-2 border-2 border-purple-500/30">
          <button
            onClick={() => setCurrentView('journey')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentView === 'journey'
                ? 'bg-purple-600 text-white'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            Journey Steps
          </button>
          <button
            onClick={() => setCurrentView('locations')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentView === 'locations'
                ? 'bg-purple-600 text-white'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            Locations
          </button>
        </div>
      </motion.div>

      {/* Journey Steps View */}
      <AnimatePresence mode="wait">
        {currentView === 'journey' && (
          <motion.div
            key="journey"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {journeyProgress.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-300 ${
                  step.completed
                    ? 'border-green-500/30 bg-green-900/10'
                    : step.unlocked
                    ? 'border-purple-500/30 cursor-pointer hover:border-purple-400/50'
                    : 'border-gray-500/30 opacity-50'
                }`}
                onClick={() => step.unlocked && setSelectedStep(step)}
                whileHover={step.unlocked ? { scale: 1.02 } : {}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Step Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-green-600'
                          : step.unlocked
                          ? 'bg-purple-600'
                          : 'bg-gray-600'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : step.unlocked ? (
                        <MapPin className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-gray-300 mb-2">{step.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{step.rewards.xp} XP</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{step.characters.length} characters</span>
                        </div>
                        {step.requiredSpells && (
                          <div className="flex items-center space-x-1">
                            <Wand2 className="w-4 h-4" />
                            <span>{step.requiredSpells.length} spells required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {step.unlocked && !step.completed && (
                    <motion.button
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStepComplete(step.id);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Begin</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>

                {/* Progress Line */}
                {index < journeyProgress.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-8 bg-gray-600">
                    {step.completed && (
                      <motion.div
                        className="w-full h-full bg-green-500"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ delay: 0.5 }}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Locations View */}
        {currentView === 'locations' && (
          <motion.div
            key="locations"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {locations.map((location, index) => {
              const IconComponent = getLocationIcon(location.type);
              return (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-500/30 cursor-pointer group overflow-hidden"
                  onClick={() => {
                    setSelectedLocation(location);
                    enhancedSoundLibrary.playLocationTheme(location.id);
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Location Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-16 h-16 text-purple-300" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {location.name}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-3 capitalize">
                    {location.type.replace('_', ' ')}
                  </p>
                  
                  <p className="text-gray-400 text-sm">
                    {location.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600/30">
                    <div className="flex items-center space-x-2">
                      <Book className="w-4 h-4 text-purple-300" />
                      <span className="text-xs text-gray-300">
                        {location.notableEvents.length} events
                      </span>
                    </div>
                    {location.residents && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-gray-300">
                          {location.residents.length} residents
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-2xl w-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 rounded-3xl p-8 border-2 border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-white mb-4">{selectedStep.title}</h2>
              <p className="text-gray-300 mb-6">{selectedStep.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-amber-300 mb-2">Rewards</h4>
                  <p className="text-gray-300">{selectedStep.rewards.xp} XP</p>
                  {selectedStep.rewards.achievements && (
                    <p className="text-gray-300">Achievements: {selectedStep.rewards.achievements.join(', ')}</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-amber-300 mb-2">Characters</h4>
                  <p className="text-gray-300">{selectedStep.characters.join(', ')}</p>
                </div>
                
                {selectedStep.requiredSpells && (
                  <div>
                    <h4 className="text-lg font-semibold text-amber-300 mb-2">Required Spells</h4>
                    <p className="text-gray-300">{selectedStep.requiredSpells.join(', ')}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setSelectedStep(null)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
                {!selectedStep.completed && selectedStep.unlocked && (
                  <button
                    onClick={() => {
                      handleStepComplete(selectedStep.id);
                      setSelectedStep(null);
                    }}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                  >
                    Complete Step
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Detail Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 rounded-3xl p-8 border-2 border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-white mb-4">{selectedLocation.name}</h2>
              <p className="text-gray-300 mb-6">{selectedLocation.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-amber-300 mb-2">Significance</h4>
                  <p className="text-gray-300 mb-4">{selectedLocation.significance}</p>
                  
                  <h4 className="text-lg font-semibold text-amber-300 mb-2">Notable Events</h4>
                  <ul className="text-gray-300 space-y-1">
                    {selectedLocation.notableEvents.map((event, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  {selectedLocation.residents && (
                    <>
                      <h4 className="text-lg font-semibold text-amber-300 mb-2">Residents</h4>
                      <ul className="text-gray-300 space-y-1 mb-4">
                        {selectedLocation.residents.map((resident, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-purple-300" />
                            <span>{resident}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Journey;
